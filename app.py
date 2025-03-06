from flask import Flask, request, render_template, redirect, url_for, session 
import mysql.connector

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Used for session management

# Database connection
db = mysql.connector.connect(
    host="root",
    user="MyConnection",
    password="sqlserver",
    database="business_events_db"
)

cursor = db.cursor()

@app.route('/')
def login_page():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    query = "SELECT * FROM user_login WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    if user:
        session['email'] = email
        return redirect(url_for('dashboard'))
    else:
        return "Invalid email or password"

@app.route('/dashboard')
def dashboard():
    if 'email' in session:
        return f"Welcome, {session['email']}!"
    else:
        return redirect(url_for('login_page'))

if __name__ == '__main__':
    app.run(debug=True)
