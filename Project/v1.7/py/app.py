import psycopg2
import csv
conn = psycopg2.connect("host=ec2-54-205-187-125.compute-1.amazonaws.com password=2a00951144d14d957fe21c02613f65b2083e6f64f7cc32c28d784c5e8b8960dc dbname=d8uhbccr3c2pvb user=bwrtaugijyfgyd")
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS "schooltable" (
    "_id" int   NOT NULL UNIQUE,
    "name" VARCHAR   NOT NULL,
    "systemid" int   NOT NULL,
    "type" VARCHAR   NOT NULL,
    "phone" VARCHAR   NOT NULL,
    "enrollment" FLOAT   NOT NULL,
    "teachercount" FLOAT   NOT NULL,
    "%_of_Teachers_<1ofexperience" FLOAT   NOT NULL,
    "%_of_teachers_<10yearsofexperience" FLOAT   NOT NULL,
    "%_of_teachers_11-20yearsofexperience" FLOAT   NOT NULL,
    "%_of_teachers_21-30yearsofexperience" FLOAT   NOT NULL,
    "%_of_teachers_30+yearsofexperience" FLOAT   NOT NULL,
    CONSTRAINT "pk_schooltable" PRIMARY KEY ( "_id" )
    )""")
cur.execute("""
    CREATE TABLE IF NOT EXISTS "principal" (
    "_id" int   NOT NULL UNIQUE,
    "name" VARCHAR   NOT NULL,
    "email" VARCHAR   NOT NULL,
    CONSTRAINT "pk_principal" PRIMARY KEY ("_id")
        )""")
cur.execute(
    """
    CREATE TABLE IF NOT EXISTS "system" (
    "systemid" int   NOT NULL UNIQUE,
    "school_system" VARCHAR   NOT NULL
    )""")
cur.execute(
    """
    CREATE TABLE IF NOT EXISTS "location" (
    "_id" int   NOT NULL UNIQUE,
    "longitude" FLOAT   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "street" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "state" VARCHAR   NOT NULL,
    "zip" VARCHAR   NOT NULL,
    CONSTRAINT "pk_location" PRIMARY KEY (
        "_id"
     ))""")
# cur.execute(
#     """
#     ALTER TABLE "principal" ADD CONSTRAINT "fk_principal__id" FOREIGN KEY("_id")
#     REFERENCES "schooltable" ("_id");
#     """
# )
# cur.execute(
#     """
#     ALTER TABLE "schooltable" ADD CONSTRAINT "fk_system_systemid" FOREIGN KEY("systemid")
#     REFERENCES "system" ("systemid");
#     """
# )
# cur.execute(
#     """
#     ALTER TABLE "location" ADD CONSTRAINT "fk_location__id" FOREIGN KEY("_id")
#     REFERENCES "schooltable" ("_id");
#     """
# )
conn.commit()
with open('../static/systemtable.csv', 'r') as f:
    next(f) # Skip the header row.
    cur.copy_from(f, 'system', sep=',')
with open('../static/schooltable.csv', 'r') as f:
    next(f) # Skip the header row.
    cur.copy_from(f, 'schooltable', sep=',')
with open('../static/printable.csv', 'r') as f:
    next(f) # Skip the header row.
    cur.copy_from(f, 'principal', sep=',')
with open('../static/locationtable.csv', 'r') as f:
    next(f) # Skip the header row.
    cur.copy_from(f, 'location', sep=',')        

conn.commit()