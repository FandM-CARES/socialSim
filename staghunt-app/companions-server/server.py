from flask import Flask

app = Flask(__name__)

@app.route("/")
def get_name():
    """
    This is GET method
    :return:
    """
    return "My Local server!!!"

if __name__ == "__main__":
    app.run()
