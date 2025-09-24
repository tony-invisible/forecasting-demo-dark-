// Holt-Winters forecasting algorithm implementation
export interface HoltWintersParams {
  alpha: number;    // Level smoothing
  beta: number;     // Trend smoothing  
  gamma: number;    // Seasonal smoothing
  period: number;   // Seasonal period
}

export interface ForecastResult {
  forecast: number[];
  confidence: number;
  lowerBound: number[];
  upperBound: number[];
}

export class HoltWinters {
  private params: HoltWintersParams;
  
  constructor(params: HoltWintersParams) {
    this.params = params;
  }
  
  fit(data: number[]): { level: number[], trend: number[], seasonal: number[] } {
    const { alpha, beta, gamma, period } = this.params;
    const n = data.length;
    
    // Initialize components
    const level = new Array(n).fill(0);
    const trend = new Array(n).fill(0);
    const seasonal = new Array(n).fill(0);
    
    // Initial seasonal components (average of first few periods)
    const initialSeasonal = new Array(period).fill(0);
    for (let i = 0; i < period && i < n; i++) {
      initialSeasonal[i] = data[i];
    }
    const seasonalAvg = initialSeasonal.reduce((sum, val) => sum + val, 0) / period;
    for (let i = 0; i < period; i++) {
      seasonal[i] = initialSeasonal[i] - seasonalAvg;
    }
    
    // Initial level and trend
    level[0] = data[0];
    if (n > 1) {
      trend[0] = data[1] - data[0];
    }
    
    // Update equations
    for (let t = 1; t < n; t++) {
      const prevLevel = level[t - 1];
      const prevTrend = trend[t - 1];
      const prevSeasonal = seasonal[t - period] || 0;
      
      // Level update
      level[t] = alpha * (data[t] - prevSeasonal) + (1 - alpha) * (prevLevel + prevTrend);
      
      // Trend update
      trend[t] = beta * (level[t] - prevLevel) + (1 - beta) * prevTrend;
      
      // Seasonal update
      seasonal[t] = gamma * (data[t] - level[t]) + (1 - gamma) * prevSeasonal;
    }
    
    return { level, trend, seasonal };
  }
  
  forecast(data: number[], horizon: number): ForecastResult {
    const { level, trend, seasonal } = this.fit(data);
    const { period } = this.params;
    const n = data.length;
    
    const forecast: number[] = [];
    const lowerBound: number[] = [];
    const upperBound: number[] = [];
    
    const lastLevel = level[n - 1];
    const lastTrend = trend[n - 1];
    
    for (let h = 1; h <= horizon; h++) {
      const seasonalIndex = (n - period + ((h - 1) % period)) % period;
      const seasonalComponent = seasonal[seasonalIndex] || 0;
      
      const pointForecast = lastLevel + h * lastTrend + seasonalComponent;
      forecast.push(Math.max(0, pointForecast)); // Ensure non-negative
      
      // Simple confidence intervals (could be more sophisticated)
      const error = Math.sqrt(this.calculateMSE(data, level, trend, seasonal));
      const confidence = Math.max(0.5, 1 - (h * 0.1)); // Decreasing confidence with horizon
      const margin = error * confidence * 1.96; // 95% confidence
      
      lowerBound.push(Math.max(0, pointForecast - margin));
      upperBound.push(pointForecast + margin);
    }
    
    return {
      forecast,
      confidence: this.calculateConfidence(data, level, trend, seasonal),
      lowerBound,
      upperBound
    };
  }
  
  private calculateMSE(data: number[], level: number[], trend: number[], seasonal: number[]): number {
    const { period } = this.params;
    let sumSquaredError = 0;
    let count = 0;
    
    for (let t = period; t < data.length; t++) {
      const forecast = level[t - 1] + trend[t - 1] + (seasonal[t - period] || 0);
      const error = data[t] - forecast;
      sumSquaredError += error * error;
      count++;
    }
    
    return count > 0 ? sumSquaredError / count : 0;
  }
  
  private calculateConfidence(data: number[], level: number[], trend: number[], seasonal: number[]): number {
    const mse = this.calculateMSE(data, level, trend, seasonal);
    const avgValue = data.reduce((sum, val) => sum + val, 0) / data.length;
    const cv = Math.sqrt(mse) / avgValue; // Coefficient of variation
    
    // Convert to 0-100 confidence score
    return Math.max(0, Math.min(100, (1 - cv) * 100));
  }
}

// Default parameters optimized for retail data
export const DEFAULT_HOLT_WINTERS_PARAMS: HoltWintersParams = {
  alpha: 0.3,    // Level smoothing
  beta: 0.1,     // Trend smoothing
  gamma: 0.3,    // Seasonal smoothing
  period: 12     // Monthly seasonality
};

// Utility function for quick forecasting
export function forecastWithHoltWinters(data: number[], horizon: number = 3): ForecastResult {
  const model = new HoltWinters(DEFAULT_HOLT_WINTERS_PARAMS);
  return model.forecast(data, horizon);
}


