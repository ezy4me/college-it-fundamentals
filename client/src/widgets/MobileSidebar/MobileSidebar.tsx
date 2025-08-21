import clsx from "clsx";
import { sections } from "@/shared/const/sections";
import { ToggleSection } from "@/features/ToggleSection";
import styles from "./MobileSidebar.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const MobileSidebar = ({ open, onClose }: Props) => {
  return (
    <>
      <div
        className={clsx(styles.overlay, { [styles.show]: open })}
        onClick={onClose}
      />
      <div className={styles.wrapper}>
        <aside className={clsx(styles.sidebar, { [styles.open]: open })}>
          <nav className={styles.nav}>
            {sections.map((section) => (
              <ToggleSection
                key={section.id}
                section={section}
                isCollapsed={false}
              />
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};
