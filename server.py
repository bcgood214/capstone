from flask import Flask, request, flash, url_for, redirect, render_template, session, send_file, send_from_directory, safe_join, abort
from flask_sqlalchemy import SQLAlchemy


MYSQL_URI = "mysql://root@localhost/test"

app = Flask(__name__)

app.secret_key = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = MYSQL_URI

db = SQLAlchemy(app)

class Users(db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
    username = db.Column(db.String(32), index = True, unique = True)
    password = db.Column(db.String(128))
    email = db.Column(db.String(120), index = True, unique = True)
    needs = db.Column(db.Integer)
    wants = db.Column(db.Integer)
    savings = db.Column(db.Integer)
    debt = db.Column(db.Integer)
    
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
    
class Budgets(db.Model):
    budget_id = db.Column('budget_id', db.Integer, primary_key = True)
    user_id = db.Column(db.Integer)
    needs = db.Column(db.Integer)
    wants = db.Column(db.Integer)
    savings = db.Column(db.Integer)
    debt = db.Column(db.Integer)
    
    def __init__(self, user_id, needs, wants, savings, debt):
        self.user_id = user_id
        self.needs = needs
        self.wants = wants
        self.savings = savings
        self.debt = debt
    

class Alerts(db.Model):
    alert_id = db.Column('alert_id', db.Integer, primary_key = True)
    recipient = db.Column(db.Integer)
    message = db.Column(db.Text)
    timestamp = db.Column(db.String(128))
    
    def __init__(self, recipient, message, timestamp):
        self.recipient = recipient
        self.message = message
        self.timestamp = timestamp

class UpcomingBills(db.Model):
    bill_id = db.Column('bill_id', db.Integer, primary_key = True)
    recipient = db.Column(db.Integer)
    date = db.Column(db.String(128))
    value = db.Column(db.Integer)
    
    def __init__(self, recipient, date, value):
        self.recipient = recipient
        self.date = date
        self.value = value

db.create_all()

@app.route("/", methods=['GET'])
def index():
   return render_template("index.html")

@app.route("/BudgetPlanner", methods=['GET'])
def BudgetPlanner():
   return render_template("createbudget.html")

@app.route("/sign_on", methods=['POST'])
def sign_on():
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    check_email = Users.query.filter_by(email=email).filter_by(confirmed=True).first()
    
    if check_email:
        return False
    else:
        user = Users(username, password, email)
        
        db.session.add(user)
        db.session.commit()
        
        session["username"] = username
        session["email"] = email
        
        user = topical_users.query.filter_by(username=session['username']).first()
        session['user_id'] = user.id
        
        return True

@app.route("/sign_in", methods=['POST'])
def sign_in():
    username = request.form["username"]
    passwrd = request.form["password"]
    
    user = Users.query.filter_by(username=username).filter_by(password=passwrd).first()
    
    if user:
        session["username"] = user.username
        session["email"] = user.email
        session["debt"] = user.debt
        session["needs"] = user.needs
        session["wants"] = user.wants
        session["savings"] = user.savings
    
    return check

@app.route("/add_info", methods=['POST'])
def add_info():
    wants = request.form["wants"]
    needs = request.form["needs"]
    debt = request.form["debt"]
    savings = request.form["savings"]
    
    if username in session:
        user = Users.query.filter_by(email=session["email"]).first()
        if user:
            if not isinstance(needs, int):
                needs = int(needs)
            
            user.needs = needs
            
            if not isinstance(wants, int):
                wants = int(wants)
            
            user.wants = wants
            
            if not isinstance(savings, int):
                savings = int(savings)
            
            user.savings = savings
            
            if not isinstance(debt, int):
                debt = int(debt)
            
            user.debt = debt
            
            db.session.commit
            
            return True


    

if __name__ == "__main__":
    app.run(debug = True)
