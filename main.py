from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def read_root():
    return {"title": "movie"}


@app.get("/heartbeat")
def heart_beat():
    return {"heartbeat": "ok"}
