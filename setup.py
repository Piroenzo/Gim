from setuptools import setup, find_packages

setup(
    name="gymfit",
    version="1.0.0",
    python_requires=">=3.11,<3.12",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.88.0",
        "uvicorn==0.20.0",
        "pydantic==1.10.7",
        "python-multipart==0.0.5",
        "sqlalchemy==1.4.44",
        "python-jose==3.3.0",
        "passlib==1.7.4",
        "python-dotenv==0.21.0",
        "aiofiles==22.1.0",
    ],
)
