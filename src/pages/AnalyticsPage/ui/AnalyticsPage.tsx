import Header from "@/widget/Header";
import AnalyticsHero from "@/widget/AnalyticsHero";
import AnalyticsMetrics from "@/widget/AnalyticsMetrics";
import { useMockAnalytics } from "../model/useMockAnalytics";
import styles from "./AnalyticsPage.module.scss";

export default function AnalyticsPage() {
  const { analytics, loading } = useMockAnalytics();

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <AnalyticsHero />
        {analytics && <AnalyticsMetrics data={analytics} />}
      </div>
    </div>
  );
}
