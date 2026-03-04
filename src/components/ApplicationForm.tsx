"use client";

import { useState } from "react";

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="glass-card rounded-xl p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-brand">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-gray-900">送信完了しました</h4>
        <p className="mt-2 text-sm text-gray-500">
          ご応募ありがとうございます。<br />
          担当者より2営業日以内にご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="glass-card space-y-5 rounded-xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="山田 太郎"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
            ふりがな <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="furigana"
            required
            placeholder="やまだ たろう"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="090-1234-5678"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
            年齢
          </label>
          <select
            name="age"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="">選択してください</option>
            <option value="10代">10代</option>
            <option value="20代">20代</option>
            <option value="30代">30代</option>
            <option value="40代">40代</option>
            <option value="50代以上">50代以上</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
            希望の雇用形態
          </label>
          <select
            name="employmentType"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="">選択してください</option>
            <option value="正社員">正社員</option>
            <option value="業務委託">業務委託</option>
            <option value="どちらでも">どちらでも</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-bold text-gray-600">
          ご質問・ご要望
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="気になることがあればお気軽にご記入ください"
          className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <p className="text-[12px] leading-[1.8] text-gray-400">
        ご入力いただいた個人情報は、採用選考の目的にのみ使用いたします。
      </p>

      <button
        type="submit"
        className="cta-pulse w-full rounded-lg bg-cta py-4 text-base font-bold text-white transition-colors hover:bg-cta-hover"
      >
        この内容で応募する
      </button>
    </form>
  );
}
