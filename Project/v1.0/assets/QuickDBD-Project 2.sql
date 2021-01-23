-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/d1wKEG
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "schoolinfo" (
    "_id" int   NOT NULL,
    "systemid" int   NOT NULL,
    "name" VARCHAR   NOT NULL,
    "type" VARCHAR   NOT NULL,
    "phone" VARCHAR   NOT NULL,
    "enrollment" int   NOT NULL,
    "techercount" int   NOT NULL,
    "% of Teachers <1 of experience" int   NOT NULL,
    "% of teachers <10 years of experience" int   NOT NULL,
    "% of teachers 11-20 years of experience" int   NOT NULL,
    "% of teachers 21-30 years of experience" int   NOT NULL,
    "% of teachers 30+ years of experience" int   NOT NULL,
    CONSTRAINT "pk_schoolinfo" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "principal" (
    "_id" int   NOT NULL,
    "name" VARCHAR   NOT NULL,
    "email" VARCHAR   NOT NULL,
    CONSTRAINT "pk_principal" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "system" (
    "systemid" int   NOT NULL,
    "School System Name" VARCHAR   NOT NULL
);

CREATE TABLE "location" (
    "_id" int   NOT NULL,
    "longitude" int   NOT NULL,
    "latitude" int   NOT NULL,
    "street" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "state" VARCHAR   NOT NULL,
    "zip" VARCHAR   NOT NULL,
    CONSTRAINT "pk_location" PRIMARY KEY (
        "_id"
     )
);

ALTER TABLE "principal" ADD CONSTRAINT "fk_principal__id" FOREIGN KEY("_id")
REFERENCES "schoolinfo" ("_id");

ALTER TABLE "system" ADD CONSTRAINT "fk_system_systemid" FOREIGN KEY("systemid")
REFERENCES "schoolinfo" ("systemid");

ALTER TABLE "location" ADD CONSTRAINT "fk_location__id" FOREIGN KEY("_id")
REFERENCES "schoolinfo" ("_id");

