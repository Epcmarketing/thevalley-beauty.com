import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, clinic } from "@/lib/clinic";

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: "zh" }]; }
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bangsar 周边医美咨询｜悦谷美容医学中心",
  description: "住在 Bangsar，想了解皮肤护理、HIFU 或整形手术？悦谷美容医学中心位于吉隆坡 Desa Sri Hartamas，提供中文咨询。了解疗程选择、到诊路线和预约前需要准备的问题。",
  alternates: { canonical: "/zh/bangsar-aesthetic-clinic/", languages: { "en-MY": "/bangsar-aesthetic-clinic/", "zh-MY": "/zh/bangsar-aesthetic-clinic/", "x-default": "/bangsar-aesthetic-clinic/" } },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "zh") notFound();
  return <article className="bg-ivory px-6 pt-32 pb-20 lg:pt-44">
    <div className="mx-auto max-w-3xl space-y-10 text-ink-soft leading-relaxed">
      <nav aria-label="面包屑"><Link href="/zh/">首页</Link> / Bangsar</nav>
      <header><h1 className="font-display text-4xl text-ink">Bangsar 周边的医美咨询与疗程选择</h1><p className="mt-6">悦谷美容医学中心（The Valley Beauty Medical Spa）欢迎来自 Bangsar、Bangsar South 及吉隆坡周边的顾客。诊所实际位于 Desa Sri Hartamas，并非 Bangsar 分店；我们提供中文、英文及马来文咨询。</p></header>
      <section><h2 className="text-2xl text-ink">先了解需求，再选择疗程</h2><p className="mt-4">咨询时可以讨论皮肤状态、外形诉求、既往治疗经历，以及能够安排的恢复时间。手术与非手术方式并非人人适用；决定前应了解个人适合度、风险、预期效果与后续护理，而不是仅凭照片选择项目。</p></section>
      <section><h2 className="text-2xl text-ink">浏览相关疗程</h2><p className="mt-4">你可以先阅读以下疗程介绍，整理想向团队询问的问题。案例和他人体验仅供沟通参考，不代表个人效果保证。</p><ul className="mt-4 space-y-3 text-gold-deep">{[["hifu-lifting", "HIFU 提拉"], ["pico-laser", "皮秒激光"], ["cell-light-therapy", "Cell Light 光疗"], ["liposuction", "抽脂塑形"], ["rhinoplasty", "隆鼻"]].map(([slug, label]) => <li key={slug}><Link className="underline" href={`/zh/treatments/${slug}/`}>{label} →</Link></li>)}</ul></section>
      <section><h2 className="text-2xl text-ink">从 Bangsar 前往诊所</h2><p className="mt-4">地址：{clinic.address.street}, {clinic.address.postalCode} {clinic.address.locality}。可以自行开车或乘坐电召车；车程随出发地点和交通情况变化，请预留时间。</p><a className="mt-4 inline-block text-gold-deep underline" href={clinic.googleProfile} target="_blank" rel="noopener noreferrer">查看诊所地图与位置 →</a></section>
      <section><h2 className="text-2xl text-ink">预约前常见问题</h2><h3 className="mt-5 text-lg text-ink">可以用中文咨询吗？</h3><p>可以。预约时说明希望使用中文，并向团队确认合适的时段。</p><h3 className="mt-5 text-lg text-ink">需要先选定疗程吗？</h3><p>不需要。可先说明希望改善的情况，咨询后再了解适合的选择、费用和护理安排。</p><h3 className="mt-5 text-lg text-ink">诊所是在 Bangsar 吗？</h3><p>不是，诊所位于 Desa Sri Hartamas。这一页为住在 Bangsar、计划前来咨询的顾客提供信息。</p></section>
      <Link href="/zh/contact/" className="inline-block rounded-full bg-gold px-7 py-3 text-white">预约中文咨询</Link>
    </div>
  </article>;
}
