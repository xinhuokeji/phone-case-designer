"use client"

import { useState, useRef } from "react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Upload, Download, RotateCcw } from "lucide-react"

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [phoneModel, setPhoneModel] = useState("iphone15")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const phoneModels = [
    { id: "iphone15pro", name: "iPhone 15 Pro Max" },
    { id: "iphone15", name: "iPhone 15" },
    { id: "iphone14pro", name: "iPhone 14 Pro" },
    { id: "samsung-s24", name: "Samsung S24 Ultra" },
    { id: "xiaomi-14", name: "小米 14 Pro" },
    { id: "huawei-p60", name: "华为 P60 Pro" },
  ]

  const selectedModel = phoneModels.find((model) => model.id === phoneModel)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">手机壳设计</h1>
            <p className="text-gray-600">上传图片，创建专属手机壳</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Upload and Model Selection */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  {!uploadedImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                    >
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">点击上传图片</p>
                      <p className="text-sm text-gray-400">支持 JPG、PNG 格式</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1"
                        >
                          更换图片
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="px-3"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">选择机型</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {phoneModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setPhoneModel(model.id)}
                        className={`p-3 text-sm rounded-lg text-left transition-colors ${
                          phoneModel === model.id
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Preview */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">预览效果</h3>
                  <div className="aspect-[9/16] rounded-3xl overflow-hidden bg-white shadow-lg">
                    <div className="relative w-full h-full">
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-gray-100">
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Preview"
                            className="w-full h-full object-cover opacity-90"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <p>上传图片预览效果</p>
                          </div>
                        )}
                      </div>
                      {/* Phone UI Elements */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full opacity-20"></div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    {selectedModel?.name}
                  </div>

                  {uploadedImage && (
                    <div className="mt-6 space-y-3">
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        下载设计图
                      </Button>
                      <Button variant="outline" className="w-full">
                        立即下单
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
