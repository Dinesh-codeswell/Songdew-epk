import xml.etree.ElementTree as ET
import sys

def extract_text(xml_file):
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        
        # Namespaces are important in Word XML
        namespaces = {
            'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
        }
        
        texts = []
        for t in root.findall('.//w:t', namespaces):
            if t.text:
                texts.append(t.text)
        
        return "\n".join(texts)
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(extract_text(sys.argv[1]))
