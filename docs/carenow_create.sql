-- tables
-- Table: doctor
CREATE TABLE doctor (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(100)  NOT NULL,
    specialization varchar(100)  NOT NULL,
    phone_number varchar(14)  NOT NULL,
    email varchar(100)  NOT NULL,
    address varchar(100)  NOT NULL,
    avaibility varchar(100)  NOT NULL,
    yoe int  NOT NULL,
    license_number varchar(50)  NOT NULL,
    notes varchar(100)  NULL,
    CONSTRAINT doctor_pk PRIMARY KEY (id)
);

-- Table: master_medication
CREATE TABLE master_medication (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(100)  NOT NULL,
    CONSTRAINT master_medication_pk PRIMARY KEY (id)
);

-- Table: master_treatment
CREATE TABLE master_treatment (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(100)  NOT NULL,
    CONSTRAINT master_treatment_pk PRIMARY KEY (id)
);

-- Table: medication_detail
CREATE TABLE medication_detail (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    master_medication_id uuid  NOT NULL,
    patient_visit_id uuid  NOT NULL,
    CONSTRAINT medication_detail_pk PRIMARY KEY (id)
);

-- Table: patient
CREATE TABLE patient (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    patient_sec_id varchar(16)  NOT NULL,
    name varchar(100)  NOT NULL,
    gender char(1)  NULL,
    dob date  NULL,
    height int  NULL,
    weight int  NULL,
    phone_number varchar(14)  NULL,
    address varchar(100)  NULL,
    CONSTRAINT patient_pk PRIMARY KEY (id)
);

-- Table: patient_visit
CREATE TABLE patient_visit (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    date_of_treatment timestamp  NOT NULL,
    patient_id uuid  NOT NULL,
    doctor_id uuid  NOT NULL,
    cost float4  NOT NULL,
    notes varchar(100)  NULL,
    created timestamptz  NOT NULL,
    CONSTRAINT patient_visit_pk PRIMARY KEY (id)
);

-- Table: treatment_detail
CREATE TABLE treatment_detail (
    id uuid  NOT NULL DEFAULT uuid_generate_v4(),
    master_treatment_id uuid  NOT NULL,
    patient_visit_id uuid  NOT NULL,
    CONSTRAINT treatment_detail_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: medication_detail_master_medication (table: medication_detail)
ALTER TABLE medication_detail ADD CONSTRAINT medication_detail_master_medication
    FOREIGN KEY (master_medication_id)
    REFERENCES master_medication (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: medication_detail_patient_visit (table: medication_detail)
ALTER TABLE medication_detail ADD CONSTRAINT medication_detail_patient_visit
    FOREIGN KEY (patient_visit_id)
    REFERENCES patient_visit (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: patient_visit_doctor (table: patient_visit)
ALTER TABLE patient_visit ADD CONSTRAINT patient_visit_doctor
    FOREIGN KEY (doctor_id)
    REFERENCES doctor (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: patient_visit_patient (table: patient_visit)
ALTER TABLE patient_visit ADD CONSTRAINT patient_visit_patient
    FOREIGN KEY (patient_id)
    REFERENCES patient (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: treatment_detail_master_treatment (table: treatment_detail)
ALTER TABLE treatment_detail ADD CONSTRAINT treatment_detail_master_treatment
    FOREIGN KEY (master_treatment_id)
    REFERENCES master_treatment (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: treatment_detail_patient_visit (table: treatment_detail)
ALTER TABLE treatment_detail ADD CONSTRAINT treatment_detail_patient_visit
    FOREIGN KEY (patient_visit_id)
    REFERENCES patient_visit (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

