import java.awt.Color;
import java.util.Random;

public class RandomColorGenerator {
    public static void main(String[] args) {
        
        Random random = new Random();

        
        int red = random.nextInt(256);
        int green = random.nextInt(256);
        int blue = random.nextInt(256);

        
        Color randomColor = new Color(red, green, blue);

       
        System.out.println("Red: " + red);
        System.out.println("Green: " + green);
        System.out.println("Blue: " + blue);
        System.out.println("Random Color: " + randomColor);

        
    }
}
