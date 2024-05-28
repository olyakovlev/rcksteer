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

    # Get the NULL value
    null_value = float(las_data.well['NULL'].value)

    data = {
        "DEPT": [depth for depth in las_data.index]
    }

    for curve in las_data.curves:
        data[curve.mnemonic] = [value if value != null_value else None for value in las_data[curve.mnemonic]]
    
    well_info = {well.mnemonic: well.value for well in las_data.well}
    
    data["wellInfo"] = well_info

    # print(type(data))
    # print(data)


    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
