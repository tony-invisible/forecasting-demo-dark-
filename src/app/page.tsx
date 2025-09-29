'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import ConfidenceBadge from '@/components/ConfidenceBadge';
import { useAppStore } from '@/lib/store';
import { DollarSign, Package, TrendingUp, AlertTriangle, Eye, BarChart3 } from 'lucide-react';

interface PortfolioData {
  portfolio_id: string;
  portfolio_name: string;
  total_revenue: number;
  total_units: number;
  forecast_revenue: number;
  miss_rate: number;
}

export default function HomePage() {
  const { currentRole, isV1View } = useAppStore();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setPortfolioData(data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-canvas">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-text-secondary">Failed to load data</p>
        </div>
      </div>
    );
  }

  // V1 View (placeholder for screenshot)
  if (isV1View) {
    return (
      <div className="min-h-screen bg-canvas">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg border border-border p-8 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-text mb-2">V1 View Placeholder</h2>
              <p className="text-text-secondary mb-6">
                This is where the V1 screenshot will be displayed. 
                The old clunky table view will be shown here for contrast.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <div className="text-sm text-text-secondary mb-2">Legacy Forecasting 1.0 Interface</div>
                <div className="font-mono text-xs text-gray-500">
                  [Static table with basic metrics would be displayed here]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // V2 View - Main forecasting interface
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-US').format(num);

  const revenueChange = ((portfolioData.forecast_revenue - portfolioData.total_revenue) / portfolioData.total_revenue) * 100;
  const missRateChange = -5.2; // Simulated improvement

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-text mb-2">Portfolio Overview</h1>
          <p className="text-text-secondary">
            {currentRole === 'ops' && 'Revenue risk and inventory insights for operational decisions'}
            {currentRole === 'engineer' && 'Model performance and data quality metrics'}
            {currentRole === 'marketer' && 'Demand patterns and promotional effectiveness'}
          </p>
        </div>

        {/* Hero KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(portfolioData.total_revenue)}
            change={revenueChange}
            subtitle="Last 24 months"
            icon={<DollarSign className="w-6 h-6" />}
          />
          <KPICard
            title="Forecast Revenue"
            value={formatCurrency(portfolioData.forecast_revenue)}
            change={revenueChange}
            subtitle="Next 3 months"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <KPICard
            title="Miss Rate"
            value={`${(portfolioData.miss_rate * 100).toFixed(1)}%`}
            change={missRateChange}
            subtitle="Model vs Baseline"
            icon={<AlertTriangle className="w-6 h-6" />}
          />
        </div>

        {/* Role-specific KPIs */}
        {currentRole === 'ops' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <KPICard
              title="Inventory Risk"
              value="Medium"
              subtitle="3 categories at risk"
              icon={<Package className="w-6 h-6" />}
            />
            <KPICard
              title="Stockout Risk"
              value="Low"
              subtitle="2 SKUs flagged"
              icon={<AlertTriangle className="w-6 h-6" />}
            />
          </div>
        )}

        {currentRole === 'engineer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <KPICard
              title="Model Accuracy"
              value="87.3%"
              change={2.1}
              subtitle="MAPE improvement"
              icon={<BarChart3 className="w-6 h-6" />}
            />
            <KPICard
              title="Data Quality"
              value="High"
              subtitle="98.2% completeness"
              icon={<Eye className="w-6 h-6" />}
            />
          </div>
        )}

        {currentRole === 'marketer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <KPICard
              title="Demand Spikes"
              value="12"
              subtitle="SKUs with >20% increase"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <KPICard
              title="Promo Effectiveness"
              value="+34%"
              change={8.2}
              subtitle="Average lift"
              icon={<DollarSign className="w-6 h-6" />}
            />
          </div>
        )}

        {/* Main Chart Placeholder */}
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Revenue Forecast vs Actuals</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-text-secondary">Model Forecast</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-text-secondary">Baseline</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm text-text-secondary">Actual</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-text-secondary">Chart will be rendered here</p>
              <p className="text-sm text-gray-500">24 months actual + baseline + model</p>
            </div>
          </div>
        </div>

        {/* Callouts Panel */}
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Top Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-text">Electronics category up 22%</p>
                <p className="text-xs text-text-secondary">Supply down. Reorder now.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-text">Clothing confidence low</p>
                <p className="text-xs text-text-secondary">Sparse history. Investigate.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-alert rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-text">Toys & Games forecast down 15%</p>
                <p className="text-xs text-text-secondary">Weeks of supply >8. Markdown recommended.</p>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
}


