from database import Base
from sqlalchemy import Column,String,Integer

class ContactForm(Base):
    __tablename__="ContactForm"
    id=Column(Integer,primary_key=True,autoincrement=True)
    your_name= Column(String,nullable=True)
    email= Column(String,nullable=True)
    subject= Column(String,nullable=True)
    message= Column(String,nullable=True)