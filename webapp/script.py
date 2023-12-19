
# result = findDurability("rustlabsDurabilityData.json", "deployable", input_data, "explo")


# from flask import Flask, redirect, url_for, request
# import pythonFunction


# app = Flask(__name__)

# @app.route("/")
# def formPage():
#     id1 = request.form['id']
#     return redirect(url_for('results', idData=id1))


# @app.route("/<idData>")
# def results():
#     global idData
#     return pythonFunction.findDurability("rustlabsDurabilityData.json", "deployable", idData, "explo")


# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, render_template, request
import pythonFunction

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        input_data = request.form.get('getId')
        raidType = str(request.form.get('raidType'))
        itemType = str(request.form.get('itemType'))
        print(itemType, input_data, raidType)
        result = pythonFunction.findDurability(itemType, input_data, raidType)
        return render_template('index.html', result=result)
    return render_template('index.html', result="MethodError")

if __name__ == "__main__":
    app.run(debug=True)