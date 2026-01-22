import { useState, useEffect } from "react";
import Header from "@/widget/Header";
import AnalyticsHero from "@/widget/AnalyticsHero";
import AnalyticsMetrics from "@/widget/AnalyticsMetrics";
import { analyticsApi, type GlobalAnalytics } from "@/shared/api";
import styles from "./AnalyticsPage.module.scss";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<GlobalAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await analyticsApi.getGlobalAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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
