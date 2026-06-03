"use client";

import type { LightingSettings } from "./scene/SceneLighting";
import styles from "./library3d.module.css";

type LightControlPanelProps = {
  settings: LightingSettings;
  onChange: (next: LightingSettings) => void;
};

export function LightControlPanel({ settings, onChange }: LightControlPanelProps) {
  return (
    <aside className={styles.lightPanel} aria-label="Library lighting controls">
      <p className={styles.lightPanelTitle}>Illumination</p>

      <label className={styles.lightRow}>
        <span className={styles.lightLabel}>Light</span>
        <button
          type="button"
          role="switch"
          aria-checked={settings.lightsOn}
          className={`${styles.lightToggle} ${settings.lightsOn ? styles.lightToggleOn : ""}`}
          onClick={() => onChange({ ...settings, lightsOn: !settings.lightsOn })}
        >
          <span className={styles.lightToggleKnob} />
          <span className={styles.lightToggleText}>
            {settings.lightsOn ? "ON" : "OFF"}
          </span>
        </button>
      </label>

      <label className={styles.lightRow}>
        <span className={styles.lightLabel}>Ambient</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(settings.ambientIntensity * 100)}
          className={styles.lightSlider}
          onChange={(e) =>
            onChange({
              ...settings,
              ambientIntensity: Number(e.target.value) / 100,
            })
          }
        />
      </label>

      <label className={styles.lightRow}>
        <span className={styles.lightLabel}>Warmth</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(settings.warmth * 100)}
          className={styles.lightSlider}
          onChange={(e) =>
            onChange({ ...settings, warmth: Number(e.target.value) / 100 })
          }
        />
      </label>
    </aside>
  );
}
