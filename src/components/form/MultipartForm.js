import Head from "next/head";
import styles from "../../styles/Form.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function MultipartForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => console.log(data);

  /** Input field component */
  const Input = ({ label, required, type, placeholder }) => (
    <div>
      <legend>{label}</legend>
      <input
        {...register(label, { required })}
        className={errors[label] && styles.inputInvalid}
        type={type}
        placeholder={placeholder}
      />
      {errors[label] && <span>mandatory</span>}
    </div>
  );

  /** Group the person input fields in a component */
  const PersonFields = () => (
    <section className={styles.inputGroup}>
      <h3>Personal information</h3>
      <Input
        label="First Name"
        required
        type="text"
        placeholder="Enter client first name"
      />
      <Input
        label="Last Name"
        required
        type="text"
        placeholder="Enter client last name"
      />
      <Input
        label="Email Address"
        required
        type="text"
        placeholder="Enter client email address"
      />
      <Input
        label="Password"
        required
        type="text"
        placeholder="Enter client password"
      />
    </section>
  );

  /** Group the contact input fields in a component */
  const CrmFields = () => (
    <section className={styles.inputGroup}>
      <h3>CRM Details</h3>
      <Input label="CRM type" type="text" placeholder="Enter your CRM type" />
      <Input label="CRM API" type="text" placeholder="Enter your CRM API" />
      <Input
        label="CRM Username"
        type="text"
        placeholder="Enter your CRM username"
      />
      <Input
        label="CRM Password"
        type="text"
        placeholder="Enter your CRM password"
      />
    </section>
  );

  /** Group the address input fields in a component */
  const SmtpFields = () => (
    <section className={styles.inputGroup}>
      <h3>SMTP Details</h3>
      <Input
        label="Sender's mail credentials"
        type="text"
        placeholder="Enter your mail address"
      />
      <Input label="PORT" type="text" placeholder="Enter your Port" />
      <Input label="Token" type="text" placeholder="Enter your token" />
      <Input
        label="Email username"
        type="text"
        placeholder="Enter your mail username"
      />
      <Input
        label="Password"
        type="text"
        placeholder="Enter your mail password"
      />
    </section>
  );

  /** Nnavigation between steps */
  const rightArrow =
    "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345";
  const leftArrow =
    "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363";

  const Navigation = () => (
    <section className={styles.navigationControls}>
      {step === fieldGroups.length - 1 && (
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid}
        >
          SAVE
        </button>
      )}
      {step < fieldGroups.length - 1 && (
        <button
          type="button"
          className={styles.nextButton}
          disabled={!isValid}
          onClick={() => {
            setStep(step + 1);
          }}
        >
          <img src={rightArrow} />
          NEXT
        </button>
      )}
      {step > 0 && (
        <button
          type="button"
          className={styles.backButton}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          <img src={leftArrow} />
          BACK
        </button>
      )}
    </section>
  );

  /** Mark the input group already filled as blue or gray if not */
  const Reference = () => (
    <footer className={styles.reference}>{renderMarkers()}</footer>
  );
  function renderMarkers() {
    let markers = [];
    for (let i = 0; i < fieldGroups.length; i++)
      markers.push(
        <span className={step >= i ? styles.markerBlue : styles.markerGray} />
      );
    return markers;
  }

  const [step, setStep] = useState(0);

  const fieldGroups = [<PersonFields />, <CrmFields />, <SmtpFields />];

  return (
    <div>
      <Head>
        <title>Multi part form | React/Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.mainContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Client Data</h2>
          {fieldGroups[step]}
          <Navigation />
          <Reference />
        </form>
      </main>
    </div>
  );
}