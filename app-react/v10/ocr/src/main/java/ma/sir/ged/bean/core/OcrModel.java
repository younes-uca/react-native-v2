package ma.sir.ged.bean.core;


import org.springframework.web.multipart.MultipartFile;


public class OcrModel {

    private String destinationLanguage;

    private MultipartFile image;

    public OcrModel() {
    }

    public OcrModel(String destinationLanguage, MultipartFile image) {
        this.destinationLanguage = destinationLanguage;
        this.image = image;

    }

    public String getDestinationLanguage() {
        return destinationLanguage;
    }

    public void setDestinationLanguage(String destinationLanguage) {
        this.destinationLanguage = destinationLanguage;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
