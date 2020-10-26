import java.io.*;
import java.util.*;

public class CountBinaryStrings_Rishabh{

public static void main(String[] args) throws Exception {
    Scanner scn = new Scanner (System.in);
    int n = scn.nextInt();
    int zeroEnd= 1;
    int oneEnd = 1;
    n--;
    while(n>0){
        int nextZeroEnd= oneEnd;
        int nextOneEnd= oneEnd+ zeroEnd;
        zeroEnd= nextZeroEnd;
        oneEnd= nextOneEnd;
        n--;
    }
    System.out.println(oneEnd+ zeroEnd);
 }

}