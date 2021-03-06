import * as axios from "axios";

interface PostResponse {
    items: [{
      comments: number;
      likes: number;
      post_url: string;
      preview: string;
      text: string;
      type: string;
      url: string;
    }]
}

export default async (url: string) => {
    // const postRequestUrl = url.split("/?")[0];
    // try {
    //     const {data: {items}} = await axios.default.get<PostResponse>(`https://instagram-post-proxy.herokuapp.com/?postUrl=${postRequestUrl}`)
    //     const item = items[0];
    //     return {
    //         dataUrl: item.url,
    //         dataPreview: item.preview,
    //         dataExtension: item.type === "video" ? ".mp4" : ".jpg"
    //       }
    // } catch(error) {
    //     console.error(error)
    //     throw new Error("Can't establish connection with server")
    // } 

    return {
        dataUrl: "https://cdn.leroymerlin.com.br/products/placa_stop_20x20cm_89586063_0001_600x600.jpg",
        dataPreview: "https://cdn.leroymerlin.com.br/products/placa_stop_20x20cm_89586063_0001_600x600.jpg",
        dataExtension: ".jpg"
    }
}