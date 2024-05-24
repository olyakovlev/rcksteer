from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import lasio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-las/")
async def upload_las(file: UploadFile = File(...)):
    contents = await file.read()
    las_data = lasio.read(contents.decode('utf-8'))

    data = {
        "DEPT": las_data.index.tolist()
    }

    for curve in las_data.curves:
        data[curve.mnemonic] = las_data[curve.mnemonic].tolist()

    well_info = {param.mnemonic: param.value for param in las_data.params}
    data["wellInfo"] = well_info

    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
