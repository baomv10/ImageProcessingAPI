import { resizeImage } from "../../utilities/resize-image";

describe('Test resize image', () => {
    it('it should resize successfully', async () => {
    const filename = "encenadaport.jpg";
        expect(async () => {
            await resizeImage(filename, 300, 300);
        }).not.toThrow();
    });
  });