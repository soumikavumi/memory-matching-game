# ------------------------------
# Import flask and datetime
# ------------------------------
import flask
import datetime
import os

# ------------------------------
# Create the Flask app
# ------------------------------
app = flask.Flask("braingame")
app.secret_key = "mysecret"

# ------------------------------
# Load HTML from templates folder
# ------------------------------
def get_html(filename):
    file = open("templates/" + filename + ".html")
    content = file.read()
    file.close()
    return content

# ------------------------------
# Score saving logic
# ------------------------------
def save_score(name, moves):
    file = open("scores.txt", "a")
    now = datetime.datetime.now()
    line = name + " " + str(moves) + " moves " + str(now.year) + "-" + str(now.month) + "-" + str(now.day)
    file.write(line + "\n")
    file.close()

# ------------------------------
# Home page
# ------------------------------
@app.route("/")
def home():
    return get_html("index")

# ------------------------------
# Submit score from frontend
# ------------------------------
@app.route("/submit", methods=["POST"])
def submit_score():
    name = flask.request.form.get("name")
    moves = flask.request.form.get("moves")
    if name and moves and moves.isdigit():
        save_score(name, int(moves))
    return flask.redirect("/")

# ------------------------------
# Run the app
# ------------------------------
if __name__ == "__main__":
    app.run(debug=True)
