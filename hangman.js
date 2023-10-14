import java.util.Scanner;
import java.util.Random;

public class Hangman {

    private String word;
    private String guessedWord;
    private int remainingGuesses;

    public Hangman() {
        String[] words = {"apple", "banana", "cat", "dog", "elephant"};
        this.word = words[(int) (Math.random() * words.length)];
        this.guessedWord = new String(new char[word.length()]).replace("\0", "*");
        this.remainingGuesses = 7;
    }

    public void play() {
        while (remainingGuesses > 0 && !guessedWord.equals(word)) {
            System.out.println(guessedWord);
            System.out.println("Guess a letter: ");
            Scanner scanner = new Scanner(System.in);
            String guess = scanner.nextLine();

            if (word.contains(guess)) {
                for (int i = 0; i < word.length(); i++) {
                    if (word.charAt(i) == guess.charAt(0)) {
                        guessedWord = guessedWord.substring(0, i) + guess + guessedWord.substring(i + 1);
                    }
                }
            } else {
                remainingGuesses--;
            }
        }

        if (guessedWord.equals(word)) {
            System.out.println("You win!");
        } else {
            System.out.println("You lose!");
        }
    }

    public static void main(String[] args) {
        Hangman hangman = new Hangman();
        hangman.play();
    }
}
