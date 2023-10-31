"use client";
import React, { useState } from "react";
import styles from "./InputInfoForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface FieldValues {
  title: string;
  description: string;
  url: string;
  timing: number;
}

interface IProps {
  handleSubmit: SubmitHandler<FieldValues>;
}

export default function InputInfoForm(props: IProps) {
  const { handleSubmit } = props;
  const {
    setValue,
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleFormSubmit((...params) => {
        reset();
        handleSubmit(...params);
      })}
    >
      <div className={styles.fieldGroup}>
        <label htmlFor="title" className={styles.label}>
          タイトル
        </label>
        <input
          id="title"
          type="text"
          className={styles.inputField}
          maxLength={100}
          {...register("title", { required: true })}
        />
      </div>
      {errors.title && <div style={{ color: "red" }}>必須入力</div>}

      <div className={styles.fieldGroup}>
        <label htmlFor="description" className={styles.label}>
          説明
        </label>
        <textarea
          id="description"
          className={styles.inputField}
          maxLength={400}
          {...register("description")}
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
          {...register("url", { required: true })}
        />
      </div>
      {errors.url && <div style={{ color: "red" }}>必須入力</div>}

      <div className={styles.fieldGroup}>
        <label htmlFor="timing" className={styles.label}>
          取得タイミング（秒）
        </label>
        <input
          id="timing"
          type="number"
          min="500"
          className={styles.inputField}
          {...register("timing", {
            required: {
              value: true,
              message: "必須入力",
            },
            minLength: {
              value: 300,
              message: "300以上で入力してください",
            },
          })}
        />
      </div>
      {errors.timing && <div style={{ color: "red" }}>必須入力</div>}

      <div className={styles.fieldGroup}>
        <label htmlFor="preset-timing" className={styles.label}>
          プリセット(取得タイミング（秒）)
        </label>
        <select
          id="preset-timing"
          className={styles.selectField}
          onChange={(e) => setValue("timing", parseInt(e.target.value))}
        >
          <option value="">選択してください</option>
          <option value={604800}>一週間ごと</option>
          <option value={86400}>一日ごと</option>
          <option value={3600}>一時間ごと</option>
        </select>
      </div>

      <button className={styles.button}>登録</button>
    </form>
  );
}
