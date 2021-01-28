# import necessary libraries
# from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import psycopg2
import sys
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np

#################################################
# Database Setup
#################################################
engine = create_engine("postgres://bwrtaugijyfgyd:2a00951144d14d957fe21c02613f65b2083e6f64f7cc32c28d784c5e8b8960dc@ec2-54-205-187-125.compute-1.amazonaws.com:5432/d8uhbccr3c2pvb")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
School = Base.classes.schooltable
# System = Base.classes.system
# Location = Base.classes.location
# Marker Table
Marker = Base.classes.marker_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

# from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgres://bwrtaugijyfgyd:2a00951144d14d957fe21c02613f65b2083e6f64f7cc32c28d784c5e8b8960dc@ec2-54-205-187-125.compute-1.amazonaws.com:5432/d8uhbccr3c2pvb"

# Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# location = create_classes(db)

# create route that renders homepage.html template
# @app.route("/")
# def home():
#     return render_template("homepage.html")

@app.route("/")
def map():
    return render_template("map.html")

# Query the database and send the jsonified results
# @app.route("/send", methods=["GET", "POST"])
# def send():
#     if request.method == "POST":
#         name = request.form["petName"]
#         lat = request.form["petLat"]
#         lon = request.form["petLon"]

#         pet = Pet(name=name, lat=lat, lon=lon)
#         db.session.add(pet)
#         db.session.commit()
#         return redirect("/", code=302)

#     return render_template("form.html")

@app.route("/api")
def location():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(Marker.name, Marker.enrollment, Marker.teachercount, Marker.schooltype, Marker.latitude, Marker.longitude).all()
    # results = session.query(School._id, School.name).all()
    session.close()
    
    # Convert list of tuples into normal lists
    all_schools = []
    
    for name, enrollment, teachercount, schooltype, latitude, longitude in results:
        school_dict = {}
        school_dict["name"] = name
        school_dict["enrollment"] = enrollment
        school_dict["teachercount"] = teachercount
        school_dict["type"] = schooltype
        school_dict["latitude"] = latitude
        school_dict["longitude"] = longitude
        all_schools.append(school_dict)
    return jsonify(all_schools)

    # all_schools = []
    # for _id, name in results:
    #     location_dict = {}
    #     location_dict["_id"] = _id
    #     location_dict["latitude"] = name
    #     all_schools.append(location_dict)
    # return jsonify(all_schools)

    # mergedtable = [{**d1, **d2} for d1, d2 in zip(all_schools, all_school_locations)]
    # print(mergedtable)

# @app.route('/data')
# def send_data():
#     con = psycopg2.connect("host='ec2-54-205-187-125.compute-1.amazonaws.com' dbname='d8uhbccr3c2pvb' user='bwrtaugijyfgyd' password='2a00951144d14d957fe21c02613f65b2083e6f64f7cc32c28d784c5e8b8960dc'")  
#     cur = con.cursor()
#     cur.execute("""select * from location""")
#     results = [col for col in cur]
    # street = [result[0] for result in results]
    # lat = [result[1] for result in results]
    # lon = [result[2] for result in results]
    # data = [{
    #     "street": street,
    #     "lat": lat,
    #     "lon": lon
    # }]
    # cur.close()
    # return jsonify(results)

# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     hover_text = [result[0] for result in results]
#     lat = [result[1] for result in results]
#     lon = [result[2] for result in results]

#     pet_data = [{
#         "type": "scattergeo",
#         "locationmode": "USA-states",
#         "lat": lat,
#         "lon": lon,
#         "text": hover_text,
#         "hoverinfo": "text",
#         "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#         }
#     }]

#     return jsonify(pet_data)


if __name__ == "__main__":
    app.run(debug=True)
