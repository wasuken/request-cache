"use client";
import React, { useState } from "react";
import styles from "./InputInfoForm.module.css";

interface IProps {
  handleSubmit: (
    title: string,
    description: string,
    url: string,
    timing: number
  ) => Promise<void>;
}

export default function InputInfoForm(props: IProps) {
  const { handleSubmit } = props;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [timing, setTiming] = useState<number>(300);

  const hhandleSubmit = () => {
    handleSubmit(title, description, url, timing);
    setTitle("")
    setDescription("")
    setUrl("")
    setTiming(300);
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.fieldGroup}>
	<label htmlFor="title" className={styles.label}>
	  タイトル
	</label>
	<input
	  id="title"
	  type="text"
	  className={styles.inputField}
	  value={title}
	  onChange={(e) => setTitle(e.target.value)}
	  maxLength={100}
	/>
      </div>

      <div className={styles.fieldGroup}>
	<label htmlFor="description" className={styles.label}>
	  説明
	</label>
	<textarea
	  id="description"
	  className={styles.inputField}
	  value={description}
	  onChange={(e) => setDescription(e.target.value)}
	  maxLength={400}
	></textarea>
      </div>

      <div className={styles.fieldGroup}>
	<label htmlFor="url" className={styles.label}>
	  URL
	</label>
	<input
	  id="url"
	  type="url"
	  className={styles.inputField}
	  value={url}
	  onChange={(e) => setUrl(e.target.value)}
	/>
      </div>

      <div className={styles.fieldGroup}>
	<label htmlFor="timing" className={styles.label}>
	  取得タイミング（秒）
	</label>
	<input
	  id="timing"
	  type="number"
	  min="500"
	  className={styles.inputField}
	  value={timing}
	  onChange={(e) => setTiming(parseInt(e.target.value))}
	/>
      </div>

      <div className={styles.fieldGroup}>
	<label htmlFor="preset-timing" className={styles.label}>
	  プリセット
	</label>
	<select
	  id="preset-timing"
	  className={styles.selectField}
	  onChange={(e) => setTiming(parseInt(e.target.value))}
	>
	  <option value="">選択してください</option>
	  <option value={604800}>一週間ごと</option>
	  <option value={86400}>一日ごと</option>
	  <option value={3600}>一時間ごと</option>
	</select>
      </div>

      <button
	className={styles.button}
	onClick={() => handleSubmit(title, description, url, timing)}
      >
	登録
      </button>
    </div>
  );
}
