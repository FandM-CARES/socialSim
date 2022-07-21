package Parsing;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FormatData {
    public static void main(String[] args) throws IOException {
        //format("staghunt_test.json");
        format("staghunt_complete.json");
    }

    public static void format(String source) throws IOException {
        String filename = CreateFile();
        File file = new File(source);

        String fileString = "[\n";
        FileWriter myWriter = new FileWriter(filename);

        try (Scanner scanner = new Scanner(file, "utf-8")) {
            while (scanner.hasNextLine()) {
                String newline = "  "+scanner.nextLine();
                fileString += newline;
                if(newline.charAt(2) == '}'){
                    fileString += ",";
                    myWriter.write(fileString);
                    fileString = "";
                }
                fileString += "\n";
            }
        } catch (Exception ex) {
            System.out.println("Could not open file. " + ex);
        }
        myWriter.write("\n \"Done\"\n]");
        myWriter.close();
    }

    public static String CreateFile () {
        String filename = "staghunt_formatted.json";
        try {
            File myObj = new File( filename);
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
            } else {
                System.out.println("Replacing existing file.");
                myObj.delete();
                myObj.createNewFile();
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return filename;
    }
}
