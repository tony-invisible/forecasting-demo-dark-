// Mock data generator for realistic retail forecasting demo
export interface Portfolio {
  portfolio_id: string;
  portfolio_name: string;
  total_revenue: number;
  total_units: number;
  forecast_revenue: number;
  miss_rate: number;
}

export interface Category {
  category_id: string;
  category_name: string;
  portfolio_id: string;
  revenue: number;
  units_sold: number;
  forecast_revenue: number;
  miss_rate: number;
  confidence: number;
}

export interface SKU {
  sku_id: string;
  sku_name: string;
  category_id: string;
  month: string;
  units_sold: number;
  revenue: number;
  on_hand: number;
  on_order: number;
  price: number;
  promo_flag: boolean;
  baseline_forecast: number;
  model_forecast: number;
  forecast_error: number;
  confidence: number;
  confidence_reason: string;
}

// Generate realistic retail data
export function generateMockData() {
  const categories = [
    { id: 'cat_1', name: 'Electronics', seasonal_factor: 1.2, base_demand: 1000 },
    { id: 'cat_2', name: 'Clothing', seasonal_factor: 1.5, base_demand: 800 },
    { id: 'cat_3', name: 'Home & Garden', seasonal_factor: 1.1, base_demand: 600 },
    { id: 'cat_4', name: 'Sports & Outdoors', seasonal_factor: 1.3, base_demand: 500 },
    { id: 'cat_5', name: 'Books & Media', seasonal_factor: 0.9, base_demand: 400 },
    { id: 'cat_6', name: 'Beauty & Health', seasonal_factor: 1.0, base_demand: 700 },
    { id: 'cat_7', name: 'Toys & Games', seasonal_factor: 2.0, base_demand: 300 },
    { id: 'cat_8', name: 'Automotive', seasonal_factor: 0.8, base_demand: 200 },
  ];

  const skus: SKU[] = [];
  const portfolioData: Portfolio = {
    portfolio_id: 'portfolio_1',
    portfolio_name: 'Retail Portfolio',
    total_revenue: 0,
    total_units: 0,
    forecast_revenue: 0,
    miss_rate: 0,
  };

  const categoryData: Category[] = [];

  // Generate 24 months of data
  const months = [];
  for (let i = 23; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    months.push(date.toISOString().slice(0, 7));
  }

  categories.forEach((cat, catIndex) => {
    const categoryTotal = {
      revenue: 0,
      units: 0,
      forecast_revenue: 0,
      miss_rate: 0,
      confidence: Math.random() * 40 + 60, // 60-100
    };

    // Generate 15-25 SKUs per category
    const skuCount = Math.floor(Math.random() * 11) + 15;
    
    for (let skuIndex = 0; skuIndex < skuCount; skuIndex++) {
      const skuId = `sku_${catIndex}_${skuIndex}`;
      const skuName = `${cat.name} SKU ${skuIndex + 1}`;
      const basePrice = Math.random() * 200 + 20; // $20-$220
      const baseDemand = cat.base_demand * (0.5 + Math.random()); // 50-150% of category base
      
      months.forEach((month, monthIndex) => {
        // Seasonal patterns
        const seasonalMultiplier = getSeasonalMultiplier(month, cat.name);
        const trendFactor = 1 + (monthIndex - 12) * 0.02; // Slight upward trend
        const randomFactor = 0.8 + Math.random() * 0.4; // 80-120% variation
        
        // Promotional effects
        const isPromo = Math.random() < 0.15; // 15% chance of promotion
        const promoMultiplier = isPromo ? 1.5 + Math.random() * 0.5 : 1; // 150-200% during promo
        
        const unitsSold = Math.round(
          baseDemand * 
          seasonalMultiplier * 
          trendFactor * 
          randomFactor * 
          promoMultiplier
        );
        
        const price = isPromo ? basePrice * (0.7 + Math.random() * 0.2) : basePrice;
        const revenue = unitsSold * price;
        
        // Generate forecasts
        const baselineForecast = generateBaselineForecast(unitsSold, monthIndex);
        const modelForecast = generateModelForecast(unitsSold, monthIndex, seasonalMultiplier);
        const forecastError = Math.abs(unitsSold - modelForecast) / unitsSold;
        
        // Confidence scoring
        const confidence = calculateConfidence(monthIndex, isPromo, forecastError);
        const confidenceReason = getConfidenceReason(confidence, monthIndex, isPromo);
        
        skus.push({
          sku_id: skuId,
          sku_name: skuName,
          category_id: cat.id,
          month,
          units_sold: unitsSold,
          revenue,
          on_hand: Math.round(unitsSold * (0.5 + Math.random() * 2)), // 0.5-2.5 months supply
          on_order: Math.round(unitsSold * (0.2 + Math.random() * 0.8)), // 0.2-1 months on order
          price,
          promo_flag: isPromo,
          baseline_forecast,
          model_forecast,
          forecast_error: forecastError,
          confidence,
          confidence_reason: confidenceReason,
        });
        
        categoryTotal.revenue += revenue;
        categoryTotal.units += unitsSold;
        categoryTotal.forecast_revenue += revenue * (1 + (Math.random() - 0.5) * 0.2);
        categoryTotal.miss_rate += forecastError;
      });
    }
    
    categoryData.push({
      category_id: cat.id,
      category_name: cat.name,
      portfolio_id: 'portfolio_1',
      revenue: categoryTotal.revenue,
      units_sold: categoryTotal.units,
      forecast_revenue: categoryTotal.forecast_revenue,
      miss_rate: categoryTotal.miss_rate / (skuCount * 24),
      confidence: categoryTotal.confidence,
    });
    
    portfolioData.total_revenue += categoryTotal.revenue;
    portfolioData.total_units += categoryTotal.units;
    portfolioData.forecast_revenue += categoryTotal.forecast_revenue;
  });
  
  portfolioData.miss_rate = categoryData.reduce((sum, cat) => sum + cat.miss_rate, 0) / categoryData.length;

  return {
    portfolio: portfolioData,
    categories: categoryData,
    skus,
  };
}

function getSeasonalMultiplier(month: string, categoryName: string): number {
  const monthNum = parseInt(month.split('-')[1]);
  
  switch (categoryName) {
    case 'Electronics':
      return monthNum === 11 || monthNum === 12 ? 1.8 : 0.9; // Holiday season
    case 'Clothing':
      return monthNum >= 3 && monthNum <= 5 ? 1.3 : // Spring
             monthNum >= 9 && monthNum <= 11 ? 1.4 : // Fall
             monthNum === 12 ? 1.6 : 0.8; // Holiday
    case 'Sports & Outdoors':
      return monthNum >= 5 && monthNum <= 8 ? 1.5 : 0.7; // Summer
    case 'Toys & Games':
      return monthNum === 12 ? 3.0 : monthNum === 11 ? 2.0 : 0.5; // Christmas
    case 'Home & Garden':
      return monthNum >= 4 && monthNum <= 6 ? 1.4 : 0.9; // Spring
    default:
      return 1.0;
  }
}

function generateBaselineForecast(actual: number, monthIndex: number): number {
  // Simple baseline: last year same month * growth rate
  const lastYearFactor = 0.9 + Math.random() * 0.2; // 90-110% of last year
  const growthRate = 1 + (Math.random() - 0.5) * 0.1; // ±5% growth
  return Math.round(actual * lastYearFactor * growthRate);
}

function generateModelForecast(actual: number, monthIndex: number, seasonal: number): number {
  // More sophisticated model forecast
  const trendFactor = 1 + (monthIndex - 12) * 0.01;
  const seasonalFactor = seasonal;
  const randomFactor = 0.95 + Math.random() * 0.1; // 95-105%
  return Math.round(actual * trendFactor * seasonalFactor * randomFactor);
}

function calculateConfidence(monthIndex: number, isPromo: boolean, error: number): number {
  let confidence = 100;
  
  // Reduce confidence for recent data
  if (monthIndex < 6) confidence -= 20;
  
  // Reduce confidence for promotional periods
  if (isPromo) confidence -= 15;
  
  // Reduce confidence for high error
  confidence -= error * 50;
  
  // Add some randomness
  confidence += (Math.random() - 0.5) * 10;
  
  return Math.max(0, Math.min(100, confidence));
}

function getConfidenceReason(confidence: number, monthIndex: number, isPromo: boolean): string {
  if (confidence >= 70) return 'High confidence - stable patterns';
  if (confidence >= 40) return 'Medium confidence - some uncertainty';
  
  const reasons = [];
  if (monthIndex < 6) reasons.push('Sparse history');
  if (isPromo) reasons.push('Promotion anomaly');
  if (confidence < 30) reasons.push('High volatility');
  
  return reasons.length > 0 ? reasons.join(', ') : 'Low confidence - investigate';
}


