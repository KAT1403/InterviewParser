import Header from "@/widget/Header";
import Welcome from "@/widget/Welcome";
import styles from "./HomePage.module.scss";
import How from "@/widget/How";
import Workspace from "@/widget/Workspace";
import Who from "@/widget/Who";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <Welcome />
      <How />
      <Workspace />
      <Who />
    </div>
  );
}
