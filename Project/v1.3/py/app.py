import psycopg2
import csv
<<<<<<< HEAD
conn = psycopg2.connect("host=ec2-54-205-187-125.compute-1.amazonaws.com password=2a00951144d14d957fe21c02613f65b2083e6f64f7cc32c28d784c5e8b8960dc dbname=d8uhbccr3c2pvb user=bwrtaugijyfgyd")
=======
conn = psycopg2.connect("host=localhost password=Sarah5504 dbname=HouseATeacher user=postgres")
>>>>>>> a5ad9ceaf40eee6adc702c34a3081a3ccb743aa0
cur = conn.cursor()
cur.execute("""
    CREATE TABLE "schooltable" (
    "_id" int   NOT NULL UNIQUE,
    "name" VARCHAR   NOT NULL,
    "systemid" int   NOT NULL,
    "type" VARCHAR   NOT NULL,
    "phone" VARCHAR   NOT NULL,
    "enrollment" FLOAT   NOT NULL,
    "teachercount" FLOAT   NOT NULL,
    "% of Teachers <1 of experience" FLOAT   NOT NULL,
    "% of teachers <10 years of experience" FLOAT   NOT NULL,
    "% of teachers 11-20 years of experience" FLOAT   NOT NULL,
    "% of teachers 21-30 years of experience" FLOAT   NOT NULL,
    "% of teachers 30+ years of experience" FLOAT   NOT NULL,
    CONSTRAINT "pk_schooltable" PRIMARY KEY ( "_id" )
    )""")
cur.execute("""
    CREATE TABLE "principal" (
    "_id" int   NOT NULL UNIQUE,
    "name" VARCHAR   NOT NULL,
    "email" VARCHAR   NOT NULL,
    CONSTRAINT "pk_principal" PRIMARY KEY ("_id")
        )""")
cur.execute(
    """
    CREATE TABLE "system" (
    "systemid" int   NOT NULL UNIQUE,
    "School System Name" VARCHAR   NOT NULL
    )""")
cur.execute(
    """
    CREATE TABLE "location" (
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
cur.execute(
    """
    ALTER TABLE "principal" ADD CONSTRAINT "fk_principal__id" FOREIGN KEY("_id")
    REFERENCES "schooltable" ("_id");
    """
)
cur.execute(
    """
    ALTER TABLE "schooltable" ADD CONSTRAINT "fk_system_systemid" FOREIGN KEY("systemid")
    REFERENCES "system" ("systemid");
    """
)
cur.execute(
    """
    ALTER TABLE "location" ADD CONSTRAINT "fk_location__id" FOREIGN KEY("_id")
    REFERENCES "schooltable" ("_id");
    """
)
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