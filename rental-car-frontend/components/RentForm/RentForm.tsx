"use client";

import { useState } from "react";
import css from "./RentForm.module.css";

type Props = {
  carId: string;
};

type FormData = {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
};

export const RentForm = ({ carId }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const [formLoading, setFormLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const payload = { ...formData, carId };
      console.log("Booking payload:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Car booked successfully!");

      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error submitting booking");
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form className={css.rentForm} onSubmit={handleSubmit}>
      <h2 className={css.titleRent}>Book your car now</h2>
      <p className={css.textRent}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={css.wrapperForm}>
        <label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            required
            className={css.input}
          />
        </label>

        <label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            required
            className={css.input}
          />
        </label>

        <label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            min={today}
            className={css.input}
          />
        </label>

        <label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Comment"
            rows={3}
            className={`${css.input} ${css.textarea}`}
          />
        </label>
      </div>

      <button className={css.button} type="submit" disabled={formLoading}>
        {formLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

