'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface DataPoint {
  date: string;
  revenue: number;
}

interface Props {
  data: DataPoint[];
  currency?: string;
}

export function RevenueChart({ data, currency = 'TRY' }: Props) {
  const symbol = currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : '€';

  return (
    <div className="h-60 -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fafafa" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#fafafa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="3 3"
            horizontal
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 11 }}
            minTickGap={24}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 11 }}
            tickFormatter={(v) => `${symbol}${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
            contentStyle={{
              background: '#1e1e22',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '8px 12px',
              fontSize: 12,
              color: '#fafafa',
            }}
            labelStyle={{ color: '#71717a', marginBottom: 4 }}
            formatter={(v: number) => [`${symbol}${v.toLocaleString()}`, 'Gelir']}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#fafafa"
            strokeWidth={1.75}
            fill="url(#revArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
