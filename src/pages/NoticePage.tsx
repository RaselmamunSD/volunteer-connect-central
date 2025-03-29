
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CalendarDays } from 'lucide-react';
import { formatDate } from '@/utils/helpers';

const notices = [
  {
    id: 1,
    title: "পূর্নমিলনী অনুষ্ঠানের তারিখ ঘোষণা",
    date: new Date("2026-07-10"),
    content: "ঈদুল আযহার তৃতীয় দিন, ২০২৬ সালে আমাদের পূর্নমিলনী অনুষ্ঠান অনুষ্ঠিত হবে। সকলকে সময়মত উপস্থিত থাকার অনুরোধ করা হচ্ছে।",
    important: true
  },
  {
    id: 2,
    title: "স্বেচ্ছাসেবক নিয়োগ চলছে",
    date: new Date("2025-12-15"),
    content: "পূর্নমিলনী অনুষ্ঠানের জন্য স্বেচ্ছাসেবক নিয়োগ চলছে। আগ্রহীদের যোগাযোগ করার অনুরোধ করা হচ্ছে।",
    important: false
  },
  {
    id: 3,
    title: "বিকাশ পেমেন্ট সিস্টেম চালু",
    date: new Date("2026-01-20"),
    content: "পূর্নমিলনী অনুষ্ঠানের জন্য অনলাইন বুকিং সিস্টেম চালু হয়েছে। এখন আপনি বিকাশের মাধ্যমে আসন বুকিং করতে পারবেন।",
    important: true
  },
  {
    id: 4,
    title: "অনুষ্ঠানের রূপরেখা প্রকাশ",
    date: new Date("2026-05-15"),
    content: "পূর্নমিলনী অনুষ্ঠানের বিস্তারিত কর্মসূচি প্রকাশ করা হয়েছে। অনুষ্ঠানের শুরু হবে সকাল ১০টায় এবং শেষ হবে রাত ৮টায়।",
    important: false
  },
  {
    id: 5,
    title: "ডোনেশন আহ্বান",
    date: new Date("2025-11-01"),
    content: "পূর্নমিলনী অনুষ্ঠান সফলভাবে আয়োজনের জন্য আপনার অবদান রাখুন। ডোনেশন সংগ্রহ চলছে।",
    important: true
  }
];

const NoticePage = () => {
  return (
    <div className="container py-6">
      <div className="banner-gradient rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">নোটিশ বোর্ড</h1>
        <p className="text-lg md:text-xl mb-4">পূর্নমিলনী-২০২৬ সংক্রান্ত সর্বশেষ তথ্য</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {notices.map(notice => (
          <Card key={notice.id} className={notice.important ? "border-l-4 border-l-primary" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {notice.important && <Bell className="h-5 w-5 text-primary" />}
                  <CardTitle className="text-xl">{notice.title}</CardTitle>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {formatDate(notice.date)}
                </div>
              </div>
              <CardDescription>
                {notice.important ? "গুরুত্বপূর্ণ বিজ্ঞপ্তি" : "সাধারণ বিজ্ঞপ্তি"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{notice.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
