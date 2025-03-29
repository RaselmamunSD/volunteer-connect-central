
import React from 'react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  TooltipProps 
} from 'recharts';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { volunteers, bookings } from '@/data/mockData';
import { formatCurrency } from '@/utils/helpers';
import { 
  BarChart3Icon, PieChartIcon, ArrowUpIcon, ArrowDownIcon, DollarSignIcon, 
  ListIcon 
} from 'lucide-react';

// Sample financial data
const incomeData = [
  { name: 'অনুষ্ঠান টিকেট বিক্রয়', value: 250000 },
  { name: 'ডোনেশন', value: 180000 },
  { name: 'স্পন্সরশিপ', value: 120000 },
  { name: 'অন্যান্য', value: 50000 },
];

const expenseData = [
  { name: 'ভেন্যু খরচ', value: 100000 },
  { name: 'খাবার', value: 150000 },
  { name: 'সাউন্ড সিস্টেম', value: 80000 },
  { name: 'ডেকোরেশন', value: 70000 },
  { name: 'প্রিন্টিং', value: 40000 },
  { name: 'অন্যান্য খরচ', value: 60000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#4CAF50'];

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    if (typeof value === 'number') {
      return (
        <div className="bg-background border rounded p-2 shadow-lg">
          <p className="label">{`${label} : ${formatCurrency(value)}`}</p>
        </div>
      );
    }
  }
  return null;
};

const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);
const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
const balance = totalIncome - totalExpense;

const FinancePage = () => {
  const totalVolunteerContribution = volunteers.reduce(
    (sum, volunteer) => sum + (volunteer.contribution || 0), 
    0
  );
  
  const totalBookingAmount = bookings.reduce(
    (sum, booking) => sum + (booking.amount || 0), 
    0
  );

  return (
    <div className="container py-6">
      <div className="bg-gradient-event rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">আয় বেয় খরচ</h1>
        <p className="text-lg md:text-xl mb-4">পূর্নমিলনী-২০২৬ এর আর্থিক হিসাব</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট আয়</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট খরচ</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(totalExpense)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">বর্তমান ব্যালেন্স</CardTitle>
            <ListIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-destructive'}`}>
              {formatCurrency(balance)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ডোনেশন</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalVolunteerContribution)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">আয়ের উৎস</CardTitle>
              <CardDescription>বিভিন্ন খাত থেকে আয়</CardDescription>
            </div>
            <PieChartIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">খরচের বিভাজন</CardTitle>
              <CardDescription>বিভিন্ন খাতে খরচ</CardDescription>
            </div>
            <BarChart3Icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8884d8">
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">আয়ের বিস্তারিত</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>আয়ের খাত</TableHead>
                  <TableHead className="text-right">পরিমাণ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>মোট আয়</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalIncome)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">খরচের বিস্তারিত</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>খরচের খাত</TableHead>
                  <TableHead className="text-right">পরিমাণ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>মোট খরচ</TableCell>
                  <TableCell className="text-right">{formatCurrency(totalExpense)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancePage;
