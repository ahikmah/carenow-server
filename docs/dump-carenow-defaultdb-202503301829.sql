--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 17.2

-- Started on 2025-03-30 18:29:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE defaultdb;
--
-- TOC entry 4501 (class 1262 OID 16441)
-- Name: defaultdb; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE defaultdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


\connect defaultdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 4502 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16558)
-- Name: doctor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctor (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    specialization character varying(100) NOT NULL,
    phone_number character varying(14) NOT NULL,
    email character varying(100) NOT NULL,
    address character varying(100) NOT NULL,
    avaibility character varying(100) NOT NULL,
    yoe integer NOT NULL,
    license_number character varying(50) NOT NULL,
    notes character varying(100)
);


--
-- TOC entry 217 (class 1259 OID 16566)
-- Name: master_medication; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.master_medication (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 16572)
-- Name: master_treatment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.master_treatment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16578)
-- Name: medication_detail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medication_detail (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    master_medication_id uuid NOT NULL,
    patient_visit_id uuid NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16584)
-- Name: patient; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patient (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nik character varying(16) NOT NULL,
    name character varying(100) NOT NULL,
    gender character(1),
    dob date,
    height integer,
    weight integer,
    phone_number character varying(14),
    address character varying(100)
);


--
-- TOC entry 221 (class 1259 OID 16590)
-- Name: patient_visit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patient_visit (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date_of_treatment timestamp with time zone DEFAULT now() NOT NULL,
    patient_id uuid NOT NULL,
    doctor_id uuid NOT NULL,
    cost real,
    notes character varying(100)
);


--
-- TOC entry 222 (class 1259 OID 16596)
-- Name: treatment_detail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.treatment_detail (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    master_treatment_id uuid NOT NULL,
    patient_visit_id uuid NOT NULL
);


--
-- TOC entry 4489 (class 0 OID 16558)
-- Dependencies: 216
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctor VALUES ('54942d67-b341-4234-9dcb-2c5c0fde3454', 'Dr. Alice Williams', 'Cardiology', '081234567890', 'alice.williams@example.com', '123 Heart Street, Jakarta', 'Monday-Friday, 9 AM - 5 PM', 15, 'CAR1234567890', 'Experienced in cardiac imaging');
INSERT INTO public.doctor VALUES ('2bf988d4-79a7-40fc-80f7-b36b21e1ef6b', 'Dr. Bob Johnson', 'Neurology', '081234567891', 'bob.johnson@example.com', '456 Brain Avenue, Jakarta', 'Tuesday-Thursday, 10 AM - 4 PM', 10, 'NEU1234567891', 'Specialist in epilepsy treatment');
INSERT INTO public.doctor VALUES ('bd129ab7-8231-4a6d-b702-fe5053fcda16', 'Dr. Clara Smith', 'Pediatrics', '081234567892', 'clara.smith@example.com', '789 Child Lane, Jakarta', 'Monday-Friday, 8 AM - 3 PM', 8, 'PED1234567892', NULL);
INSERT INTO public.doctor VALUES ('ccd00243-7eee-451a-ada6-c94cce02c4b7', 'Dr. David Lee', 'Dermatology', '081234567893', 'david.lee@example.com', '321 Skin Road, Jakarta', 'Wednesday-Saturday, 11 AM - 6 PM', 12, 'DER1234567893', 'Skincare for chronic conditions');
INSERT INTO public.doctor VALUES ('13e4741d-3381-4205-9f77-d34d42df68ae', 'Dr. Emma Taylor', 'Orthopedics', '081234567894', 'emma.taylor@example.com', '654 Bone Blvd, Jakarta', 'Monday-Friday, 7 AM - 2 PM', 20, 'ORT1234567894', 'Renowned joint replacement surgeon');
INSERT INTO public.doctor VALUES ('940183d7-4338-4cc9-b7bb-6a6b637f7b75', 'Dr. Fikri Anwar', 'Endocrinology', '081234567895', 'fikri.anwar@example.com', '987 Hormone Alley, Jakarta', 'Tuesday-Friday, 10 AM - 3 PM', 11, 'END1234567895', 'Focus on diabetes management');
INSERT INTO public.doctor VALUES ('c641cc53-eb3c-417a-8d51-10bb444d3e6f', 'Dr. Gina Huang', 'Gynecology', '081234567896', 'gina.huang@example.com', '123 Wellness Street, Jakarta', 'Monday-Thursday, 9 AM - 4 PM', 9, 'GYN1234567896', 'Laparoscopic surgery expert');
INSERT INTO public.doctor VALUES ('c2b982bb-7926-4c6a-b03f-f7a9e787dec5', 'Dr. Hari Pratama', 'Pulmonology', '081234567897', 'hari.pratama@example.com', '789 Lung Boulevard, Jakarta', 'Monday-Saturday, 8 AM - 5 PM', 13, 'PUL1234567897', 'Chronic respiratory disorder care');
INSERT INTO public.doctor VALUES ('9683d110-6f72-414d-bf9c-b9f60f0c2df8', 'Dr. Ivy Chen', 'Ophthalmology', '081234567898', 'ivy.chen@example.com', '456 Vision Lane, Jakarta', 'Wednesday-Saturday, 10 AM - 6 PM', 7, 'OPH1234567898', 'Specialized in cataract surgery');
INSERT INTO public.doctor VALUES ('0876e740-2694-4b37-a239-2976503600a5', 'Dr. James Bond', 'Urology', '081234567899', 'james.bond@example.com', '321 Kidney Road, Jakarta', 'Tuesday-Friday, 9 AM - 3 PM', 5, 'URO1234567899', 'Focus on minimally invasive surgeries');


--
-- TOC entry 4490 (class 0 OID 16566)
-- Dependencies: 217
-- Data for Name: master_medication; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.master_medication VALUES ('9f1abfd3-7929-40ca-8ac7-da1c283da256', 'Ibuprofen');
INSERT INTO public.master_medication VALUES ('541d534f-8ba5-487b-9d8c-ac949c7bcccd', 'Paracetamol');
INSERT INTO public.master_medication VALUES ('c8b49017-1197-4b48-8a9c-e89e1f1a43ce', 'Amoxicillin');
INSERT INTO public.master_medication VALUES ('36515fb2-e2e9-4ac5-874a-c8e2c0e23585', 'Morphine');
INSERT INTO public.master_medication VALUES ('02ae617b-171f-4a15-b5db-5919893c2746', 'Painkillers');
INSERT INTO public.master_medication VALUES ('ddc45e21-f031-4f9f-ae32-8cbe2146e484', 'Antibiotics');
INSERT INTO public.master_medication VALUES ('82ae2441-7405-42eb-93ed-fe82b5c652ce', 'Aspirin');
INSERT INTO public.master_medication VALUES ('5f228159-50d4-4518-9f5e-4fbd198a15fe', 'Metformin');
INSERT INTO public.master_medication VALUES ('1a4c7fbb-63fa-45e7-b1ff-4bf3285f53a5', 'Cetirizine');
INSERT INTO public.master_medication VALUES ('7d50b356-8011-4457-8d72-b24733b09d80', 'Doxycycline');
INSERT INTO public.master_medication VALUES ('d50d3b80-d2bb-41ad-8564-038bdc836ab8', 'Simvastatin');
INSERT INTO public.master_medication VALUES ('a51d86c8-b96c-44c3-bfc3-6e40eb62a014', 'Lisinopril');
INSERT INTO public.master_medication VALUES ('4bba47cb-86d9-4f3f-b29d-ebb0145a3b73', 'Furosemide');
INSERT INTO public.master_medication VALUES ('4089450c-2251-4588-93d8-ece7a6da28e7', 'Insulin');
INSERT INTO public.master_medication VALUES ('d364ffc3-116d-46d0-9630-a19a19340581', 'Warfarin');
INSERT INTO public.master_medication VALUES ('d3a651e4-882b-41ae-94e0-0026e8eb1f1f', 'Omeprazole');
INSERT INTO public.master_medication VALUES ('a6b289b2-486c-4dd8-aea6-dbccd99fe46b', 'Prednisone');
INSERT INTO public.master_medication VALUES ('e7d7aaac-a021-4f95-9816-caaec737b091', 'Losartan');
INSERT INTO public.master_medication VALUES ('a3573f94-1af0-4224-9e2e-c31eafd559ef', 'Clopidogrel');
INSERT INTO public.master_medication VALUES ('1fb0919b-dbff-4d8b-abf7-d3de66db8936', 'Diphenhydramine');
INSERT INTO public.master_medication VALUES ('219b6ce1-96c4-4b7e-a75c-d3e1200066ad', 'Salbutamol');
INSERT INTO public.master_medication VALUES ('47beb995-4a9c-44f4-909f-c459347a2110', 'Fluoxetine');
INSERT INTO public.master_medication VALUES ('24c5f640-0809-4f1d-9d48-03d604f59713', 'Hydrochlorothiazide');
INSERT INTO public.master_medication VALUES ('73e6c7ec-23b2-4f70-a401-e9a23a1bb26d', 'Gabapentin');
INSERT INTO public.master_medication VALUES ('8b03f3b9-d906-47f6-ab36-3502e88c4e53', 'Levothyroxine');
INSERT INTO public.master_medication VALUES ('cc163886-67da-4f89-85b2-d864722c468e', 'Albuterol');
INSERT INTO public.master_medication VALUES ('b406811c-c593-4d77-a54b-4c50a3d4c0e3', 'Atorvastatin');
INSERT INTO public.master_medication VALUES ('d9f9a4f9-acdf-4b22-b0bf-dcfd1c03fefd', 'Loratadine');
INSERT INTO public.master_medication VALUES ('1241bd09-224c-4045-bb6e-b306d12ec0d9', 'Ranitidine');
INSERT INTO public.master_medication VALUES ('8d834b70-c099-423d-8345-dd9ab2a99889', 'Acetaminophen');
INSERT INTO public.master_medication VALUES ('07558834-9482-4d87-9bd2-58e28b0e19f5', 'Tamsulosin');
INSERT INTO public.master_medication VALUES ('e00be038-521c-4aaa-8623-7537f97464ce', 'Vitamin C');


--
-- TOC entry 4491 (class 0 OID 16572)
-- Dependencies: 218
-- Data for Name: master_treatment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.master_treatment VALUES ('5b19cea3-4fcf-40cc-882c-865c98a86d72', 'General Checkup');
INSERT INTO public.master_treatment VALUES ('eeb65efa-8568-489e-90c0-aadc90c26d4b', 'Blood Test');
INSERT INTO public.master_treatment VALUES ('82cf1932-8fb4-4455-aa4e-2505e2973f2c', 'X-Ray');
INSERT INTO public.master_treatment VALUES ('54da5634-b60e-41e6-9301-9891294e21f6', 'Consultation');
INSERT INTO public.master_treatment VALUES ('d531560f-190e-4695-a2f3-de1c01ebc1ba', 'Surgery');
INSERT INTO public.master_treatment VALUES ('4b60468c-73af-45b5-8f7c-f5c31f269c58', 'Vaccination');
INSERT INTO public.master_treatment VALUES ('fb57416e-c736-4db7-bcc4-81c87017df07', 'CT Scan');
INSERT INTO public.master_treatment VALUES ('2bb16f86-7504-48a3-9ad7-db0f9c560b97', 'MRI Scan');
INSERT INTO public.master_treatment VALUES ('11a41b37-dab6-41f2-ab73-19329174479c', 'Ultrasound');
INSERT INTO public.master_treatment VALUES ('a7be701f-d86a-4113-9fdc-5fb9c7722422', 'Physical Therapy');
INSERT INTO public.master_treatment VALUES ('611030c0-12e7-4be8-b3da-0bc2fd1a1fb5', 'Echocardiogram');
INSERT INTO public.master_treatment VALUES ('ac1f566f-c0ff-48e2-80c4-e2649733689b', 'Dermatology Consultation');
INSERT INTO public.master_treatment VALUES ('7ceea8ce-69b1-4178-802d-547e89fb6e2f', 'Endoscopy');
INSERT INTO public.master_treatment VALUES ('b3fa0ba9-3b84-468d-9b88-ad8712a26b09', 'Dialysis');
INSERT INTO public.master_treatment VALUES ('b2c07115-eae0-4c17-9661-8cb16565d1ab', 'Chemotherapy');
INSERT INTO public.master_treatment VALUES ('781c3a35-5334-47f3-a1e9-db865db7e867', 'Radiation Therapy');
INSERT INTO public.master_treatment VALUES ('ded19f6a-7025-469e-9fc5-ee8417a0b27e', 'Cardiogram');
INSERT INTO public.master_treatment VALUES ('77efc4c1-25e0-4eef-a4aa-daee9487048f', 'Knee Replacement Surgery');
INSERT INTO public.master_treatment VALUES ('5c5630e5-5aad-4e85-ae01-fdbbd9e410db', 'Hip Replacement Surgery');
INSERT INTO public.master_treatment VALUES ('b37e3934-d22b-48e0-9d8e-2c5edb54d78b', 'Cataract Surgery');
INSERT INTO public.master_treatment VALUES ('9132b4b5-578c-496f-acc1-da0c70a5d082', 'Post-surgery Consultation');
INSERT INTO public.master_treatment VALUES ('a89a8d8e-08b0-4c7f-ac10-f60a3b936646', 'Laparoscopy');
INSERT INTO public.master_treatment VALUES ('5650761f-f969-4624-945c-97b4a3a0062c', 'Viral Infection Treatment');
INSERT INTO public.master_treatment VALUES ('8480d83c-8ade-4e20-89da-e8c0381d1ab1', 'Allergy Testing');
INSERT INTO public.master_treatment VALUES ('89ba147b-1552-44ef-b89b-2502f1116196', 'Vaccine Booster');
INSERT INTO public.master_treatment VALUES ('f2d77211-246b-44a1-91e8-ac6475d001e3', 'Physician Consultation');
INSERT INTO public.master_treatment VALUES ('56fa9c98-8d99-420f-94c9-e07d9ea75ac7', 'Postnatal Care');
INSERT INTO public.master_treatment VALUES ('42a93811-1f02-4d8a-87c1-73d0828b34dd', 'Pre-surgery Screening');
INSERT INTO public.master_treatment VALUES ('c9325fee-247d-4df3-bccf-b05ea349df3d', 'Pain Management');
INSERT INTO public.master_treatment VALUES ('a3ca41f0-f2c0-4838-9d59-1b0751ab3ec8', 'Dental Checkup');
INSERT INTO public.master_treatment VALUES ('6d4f3c64-db5e-4d98-b257-4a851f018d09', 'Physiotherapy');
INSERT INTO public.master_treatment VALUES ('a44e76dd-81ea-40f3-8c13-b973f4719a5c', 'Spinal Tap');


--
-- TOC entry 4492 (class 0 OID 16578)
-- Dependencies: 219
-- Data for Name: medication_detail; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.medication_detail VALUES ('9a0bd879-5230-4c87-8b0c-446fee3752c8', 'ddc45e21-f031-4f9f-ae32-8cbe2146e484', 'c29c54e4-3a3a-44d7-8e56-6ab5e866c149');
INSERT INTO public.medication_detail VALUES ('5884b27f-9ff4-4f5c-bbf1-baadff1fd6c8', 'e00be038-521c-4aaa-8623-7537f97464ce', 'c29c54e4-3a3a-44d7-8e56-6ab5e866c149');
INSERT INTO public.medication_detail VALUES ('b2b0c468-69e7-498b-a014-2036bdbb12c8', '9f1abfd3-7929-40ca-8ac7-da1c283da256', '7803f4a9-8b55-45a3-a018-7a5335b1d1a8');
INSERT INTO public.medication_detail VALUES ('3d94a341-b0c5-4e1b-af31-5d789fdc8f62', 'a51d86c8-b96c-44c3-bfc3-6e40eb62a014', '7803f4a9-8b55-45a3-a018-7a5335b1d1a8');
INSERT INTO public.medication_detail VALUES ('9e2805c2-cd56-4e7a-98fe-7c303d86e46d', '9f1abfd3-7929-40ca-8ac7-da1c283da256', '0a061d76-cd22-4ffa-9b2c-7bdd332254ef');
INSERT INTO public.medication_detail VALUES ('d8af7414-b688-48bb-97c2-e817af730451', 'a51d86c8-b96c-44c3-bfc3-6e40eb62a014', '0a061d76-cd22-4ffa-9b2c-7bdd332254ef');
INSERT INTO public.medication_detail VALUES ('092cb9dd-31f9-4ae7-9290-c4df2f8f48fd', '82ae2441-7405-42eb-93ed-fe82b5c652ce', '0a061d76-cd22-4ffa-9b2c-7bdd332254ef');


--
-- TOC entry 4493 (class 0 OID 16584)
-- Dependencies: 220
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patient VALUES ('3fa85f64-5717-4562-b3fc-2c963f66afa6', '3334567890987653', 'Awaliyatul Hikmah', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.patient VALUES ('f1d0b093-202f-43e8-9248-afd2cac26347', '1234567890987653', 'Chelsey Fisher', 'F', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.patient VALUES ('8abe614a-271b-43c2-bc26-1b97a99dc7a4', '4444567890987653', 'Aman Ansari', 'M', '1995-02-27', NULL, NULL, NULL, NULL);
INSERT INTO public.patient VALUES ('8f4aee7b-1d0f-4dc5-943f-e45d03e0129c', '1111111111111111', 'Zain Ansari', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 4494 (class 0 OID 16590)
-- Dependencies: 221
-- Data for Name: patient_visit; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patient_visit VALUES ('c29c54e4-3a3a-44d7-8e56-6ab5e866c149', '2025-03-30 03:24:01.543574+00', 'f1d0b093-202f-43e8-9248-afd2cac26347', '54942d67-b341-4234-9dcb-2c5c0fde3454', NULL, NULL);
INSERT INTO public.patient_visit VALUES ('7803f4a9-8b55-45a3-a018-7a5335b1d1a8', '2025-04-29 17:00:00+00', '8f4aee7b-1d0f-4dc5-943f-e45d03e0129c', '54942d67-b341-4234-9dcb-2c5c0fde3454', 0, NULL);
INSERT INTO public.patient_visit VALUES ('0a061d76-cd22-4ffa-9b2c-7bdd332254ef', '2025-04-29 17:00:00+00', '3fa85f64-5717-4562-b3fc-2c963f66afa6', '54942d67-b341-4234-9dcb-2c5c0fde3454', 0, NULL);


--
-- TOC entry 4495 (class 0 OID 16596)
-- Dependencies: 222
-- Data for Name: treatment_detail; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.treatment_detail VALUES ('fa4bc66f-b774-42a6-afd1-dab7bb685082', '54da5634-b60e-41e6-9301-9891294e21f6', 'c29c54e4-3a3a-44d7-8e56-6ab5e866c149');
INSERT INTO public.treatment_detail VALUES ('1765c37e-0eb5-4f3d-b1fe-8baeb570a79e', '5b19cea3-4fcf-40cc-882c-865c98a86d72', 'c29c54e4-3a3a-44d7-8e56-6ab5e866c149');
INSERT INTO public.treatment_detail VALUES ('1c73319e-de86-4b58-8f1c-27fe2ff79046', '5b19cea3-4fcf-40cc-882c-865c98a86d72', '7803f4a9-8b55-45a3-a018-7a5335b1d1a8');
INSERT INTO public.treatment_detail VALUES ('cebcada5-4b3d-42ff-b6d9-fbfc0e734ffb', 'eeb65efa-8568-489e-90c0-aadc90c26d4b', '7803f4a9-8b55-45a3-a018-7a5335b1d1a8');
INSERT INTO public.treatment_detail VALUES ('4bbb34fa-44d9-4462-913b-d3d811e53c8a', '5b19cea3-4fcf-40cc-882c-865c98a86d72', '0a061d76-cd22-4ffa-9b2c-7bdd332254ef');
INSERT INTO public.treatment_detail VALUES ('c9ecb95b-7cd3-4342-95f9-6c5e7deffc62', 'eeb65efa-8568-489e-90c0-aadc90c26d4b', '0a061d76-cd22-4ffa-9b2c-7bdd332254ef');


--
-- TOC entry 4311 (class 2606 OID 16565)
-- Name: doctor doctor_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_pk PRIMARY KEY (id);


--
-- TOC entry 4313 (class 2606 OID 16681)
-- Name: doctor doctor_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_unique UNIQUE (phone_number);


--
-- TOC entry 4315 (class 2606 OID 16683)
-- Name: doctor doctor_unique_1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_unique_1 UNIQUE (email);


--
-- TOC entry 4317 (class 2606 OID 16685)
-- Name: doctor doctor_unique_2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_unique_2 UNIQUE (license_number);


--
-- TOC entry 4319 (class 2606 OID 16571)
-- Name: master_medication master_medication_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_medication
    ADD CONSTRAINT master_medication_pk PRIMARY KEY (id);


--
-- TOC entry 4321 (class 2606 OID 16677)
-- Name: master_medication master_medication_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_medication
    ADD CONSTRAINT master_medication_unique UNIQUE (name);


--
-- TOC entry 4323 (class 2606 OID 16577)
-- Name: master_treatment master_treatment_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_treatment
    ADD CONSTRAINT master_treatment_pk PRIMARY KEY (id);


--
-- TOC entry 4325 (class 2606 OID 16675)
-- Name: master_treatment master_treatment_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.master_treatment
    ADD CONSTRAINT master_treatment_unique UNIQUE (name);


--
-- TOC entry 4327 (class 2606 OID 16583)
-- Name: medication_detail medication_detail_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medication_detail
    ADD CONSTRAINT medication_detail_pk PRIMARY KEY (id);


--
-- TOC entry 4329 (class 2606 OID 16694)
-- Name: medication_detail medication_detail_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medication_detail
    ADD CONSTRAINT medication_detail_unique UNIQUE (master_medication_id, patient_visit_id);


--
-- TOC entry 4331 (class 2606 OID 16589)
-- Name: patient patient_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pk PRIMARY KEY (id);


--
-- TOC entry 4333 (class 2606 OID 16679)
-- Name: patient patient_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_unique UNIQUE (nik);


--
-- TOC entry 4335 (class 2606 OID 16595)
-- Name: patient_visit patient_visit_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient_visit
    ADD CONSTRAINT patient_visit_pk PRIMARY KEY (id);


--
-- TOC entry 4337 (class 2606 OID 16601)
-- Name: treatment_detail treatment_detail_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treatment_detail
    ADD CONSTRAINT treatment_detail_pk PRIMARY KEY (id);


--
-- TOC entry 4339 (class 2606 OID 16696)
-- Name: treatment_detail treatment_detail_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treatment_detail
    ADD CONSTRAINT treatment_detail_unique UNIQUE (patient_visit_id, master_treatment_id);


--
-- TOC entry 4340 (class 2606 OID 16642)
-- Name: medication_detail medication_detail_master_medication; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medication_detail
    ADD CONSTRAINT medication_detail_master_medication FOREIGN KEY (master_medication_id) REFERENCES public.master_medication(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4341 (class 2606 OID 16652)
-- Name: medication_detail medication_detail_patient_visit; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medication_detail
    ADD CONSTRAINT medication_detail_patient_visit FOREIGN KEY (patient_visit_id) REFERENCES public.patient_visit(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4342 (class 2606 OID 16637)
-- Name: patient_visit patient_visit_doctor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient_visit
    ADD CONSTRAINT patient_visit_doctor FOREIGN KEY (doctor_id) REFERENCES public.doctor(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4343 (class 2606 OID 16667)
-- Name: patient_visit patient_visit_patient; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patient_visit
    ADD CONSTRAINT patient_visit_patient FOREIGN KEY (patient_id) REFERENCES public.patient(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4344 (class 2606 OID 16647)
-- Name: treatment_detail treatment_detail_master_treatment; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treatment_detail
    ADD CONSTRAINT treatment_detail_master_treatment FOREIGN KEY (master_treatment_id) REFERENCES public.master_treatment(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4345 (class 2606 OID 16657)
-- Name: treatment_detail treatment_detail_patient_visit; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.treatment_detail
    ADD CONSTRAINT treatment_detail_patient_visit FOREIGN KEY (patient_visit_id) REFERENCES public.patient_visit(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-03-30 18:30:02

--
-- PostgreSQL database dump complete
--

