package ma.sir.ged.ws.facade.admin;

import ma.sir.ged.bean.core.OcrModel;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

//Step 1:
// create path variable (var en haut)::: TESSDATA_PREFIX with value C:\Program Files\Tesseract-OCR\tessdata
// add to Path var (var en haut)::: value C:\Program Files\Tesseract-OCR
// copy eng.traineddata and fra.traineddata from resources\ocr\tessdata\ to C:\Program Files\Tesseract-OCR\tessdata
@RestController
@RequestMapping("/api/admin/ocr")
public class OcrRestAdmin {

    String PATH = "C:\\Program Files\\Tesseract-OCR\\tessdata";

    // POST: http://localhost:8037/api/admin/ocr/
    // in form-data :
    // key==> destinationLanguage ;; value ==> fra
    // key==> image ;; value ==> browse your image from :: resources\ocr
    @PostMapping("/")
    public String DoOCR(@RequestParam("destinationLanguage") String destinationLanguage,
                        @RequestParam("image") MultipartFile image) throws IOException {


        OcrModel request = new OcrModel();
        request.setDestinationLanguage(destinationLanguage);
        request.setImage(image);

        ITesseract instance = new Tesseract();

        try {

            BufferedImage in = ImageIO.read(convert(image));

            BufferedImage newImage = new BufferedImage(in.getWidth(), in.getHeight(), BufferedImage.TYPE_INT_ARGB);

            Graphics2D g = newImage.createGraphics();
            g.drawImage(in, 0, 0, null);
            g.dispose();

            instance.setLanguage(request.getDestinationLanguage());
            instance.setDatapath(PATH);

            String result = instance.doOCR(newImage);

            return result;

        } catch (TesseractException | IOException e) {
            System.err.println(e.getMessage());
            return "Error while reading image";
        }

    }

    public static File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

}
