from fastapi import FastAPI, Request,Form,Depends,Query
from fastapi.responses import HTMLResponse,RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel

from database import engine, Base,SessionLocal
from models import ContactForm
DATABASE_URL = "sqlite:///./task.db"


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")
#this function helps to create temp connection between backend and server
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
class Inputtype(BaseModel):
        your_name:str
        email:str
        subject:str
        message:str

@app.get("/home.html", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req,
        name="home.html",
    )
@app.get("/", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req,
        name="home.html",
    )


@app.get("/about.html", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req,
        name="about.html",
    )
@app.get("/skills.html", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req,
        name="skills.html",
    )
@app.get("/projects.html", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req,
        name="projects.html",
    )
@app.get("/contacts.html", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req,
        name="contacts.html",
    )
@app.post('/contacts.html')
def appointment(user:Annotated[Inputtype,Form()],db:Session=Depends(get_db)):
    new_user = ContactForm(
        your_name=user.your_name,
        email=user.email,
        subject=user.subject,
        message=user.message
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return RedirectResponse(
        url="/contacts.html",
        status_code=303
    )