
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/utils/helpers';
import { BarChart4, PieChart as PieChartIcon, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const incomeData = [
  { name: 'জানুয়ারি', amount: 50000 },
  { name: 'ফেব্রুয়ারি', amount: 70000 },
  { name: 'মার্চ', amount: 60000 },
  { name: 'এপ্রিল', amount: 90000 },
  { name: 'মে', amount: 110000 },
  { name: 'জুন', amount: 120000 },
];

const expenseData = [
  { name: 'সাউন্ড সিস্টেম', value: 30000 },
  { name: 'ভেন্যু', value: 50000 },
  { name: 'খাবার', value: 80000 },
  { name: 'ডেকোরেশন', value: 40000 },
  { name: 'মাল্টিমিডিয়া', value: 25000 },
  { name: 'অন্যান্য', value: 35000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const FinancePage = () => {
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">আয়-ব্যয় হিসাব</h1>
        <p className="text-lg md:text-xl mb-4">পূর্নমিলনী-২০২৬ এর আর্থিক তথ্য</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">মোট আয়</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
            <p className="text-xs text-muted-foreground">গত মাসের তুলনায় +১৫%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">মোট ব্যয়</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</div>
            <p className="text-xs text-muted-foreground">গত মাসের তুলনায় +১০%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">ব্যালেন্স</CardTitle>
            <BarChart4 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground">বর্তমান ব্যালেন্স</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-primary" />
              <CardTitle>মাসিক আয়</CardTitle>
            </div>
            <CardDescription>
              ২০২৬ সালের পূর্নমিলনী অনুষ্ঠানের জন্য মাসিক আয়ের হিসাব
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="amount" name="টাকার পরিমাণ" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              <CardTitle>খরচের বিভাজন</CardTitle>
            </div>
            <CardDescription>
              পূর্নমিলনী অনুষ্ঠানের জন্য বিভিন্ন খাতে ব্যয়
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক খরচের তালিকা</CardTitle>
          <CardDescription>ব্যয়ের বিস্তারিত বিবরণ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-left">বিবরণ</th>
                  <th className="py-2 text-right">পরিমাণ</th>
                  <th className="py-2 text-right">তারিখ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3">ভেন্যু বুকিং অগ্রিম</td>
                  <td className="text-right">{formatCurrency(25000)}</td>
                  <td className="text-right">১৫ জানুয়ারি, ২০২৬</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">ব্যানার ও পোস্টার ছাপা</td>
                  <td className="text-right">{formatCurrency(15000)}</td>
                  <td className="text-right">২০ ফেব্রুয়ারি, ২০২৬</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">সাউন্ড সিস্টেম অগ্রিম</td>
                  <td className="text-right">{formatCurrency(10000)}</td>
                  <td className="text-right">৫ মার্চ, ২০২৬</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">ক্যাটারিং সার্ভিস অগ্রিম</td>
                  <td className="text-right">{formatCurrency(30000)}</td>
                  <td className="text-right">১২ এপ্রিল, ২০২৬</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3">মাল্টিমিডিয়া প্রজেক্টর ভাড়া</td>
                  <td className="text-right">{formatCurrency(8000)}</td>
                  <td className="text-right">২৫ এপ্রিল, ২০২৬</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancePage;
