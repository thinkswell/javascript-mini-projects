import java.io.*;
import org.apache.batik.dom.*;
import org.apache.batik.dom.svg.*;
import org.apache.batik.svggen.*;

public class SvgExample {
    public static void main(String[] args) throws IOException {
        // Create a new SVG document
        DOMImplementation impl = SVGDOMImplementation.getDOMImplementation();
        String svgNS = SVGDOMImplementation.SVG_NAMESPACE_URI;
        Document doc = impl.createDocument(svgNS, "svg", null);
        
        // Set the width and height of the document
        SVGOMSVGElement svgRoot = (SVGOMSVGElement)doc.getDocumentElement();
        svgRoot.setAttributeNS(null, "width", "200");
        svgRoot.setAttributeNS(null, "height", "200");
        
        // Create a circle element
        SVGOMCircleElement circle = new SVGOMCircleElement() {
            protected AttributeInitializer getAttributeInitializer() {
                return new AttributeInitializer() {
                    public void initialize(Element elt) {
                        super.initialize(elt);
                        elt.setAttributeNS(null, "cx", "100");
                        elt.setAttributeNS(null, "cy", "100");
                        elt.setAttributeNS(null, "r", "50");
                    }
                };
            }
        };
        
        // Add the circle to the document
        svgRoot.appendChild(circle);
        
        // Write the SVG document to a file
        Writer out = new OutputStreamWriter(new FileOutputStream("example.svg"), "UTF-8");
        SVGGeneratorContext ctx = SVGGeneratorContext.createDefault(doc);
        SVGGraphics2D g = new SVGGraphics2D(ctx, false);
        g.setSVGCanvasSize(new Dimension(200, 200));
        g.getRoot(svgRoot);
        g.stream(out, true);
    }
}
