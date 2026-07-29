"""Encode generator PPMs with the system libwebp, with no third-party packages."""
import ctypes, glob, os

lib = ctypes.CDLL('libwebp.so.7')
lib.WebPEncodeRGB.argtypes = [ctypes.POINTER(ctypes.c_uint8), ctypes.c_int, ctypes.c_int,
                              ctypes.c_int, ctypes.c_float,
                              ctypes.POINTER(ctypes.POINTER(ctypes.c_uint8))]
lib.WebPEncodeRGB.restype = ctypes.c_size_t
lib.WebPFree.argtypes = [ctypes.c_void_p]

for path in glob.glob('public/assets/images/*.ppm'):
    with open(path, 'rb') as f:
        assert f.readline().strip() == b'P6'
        width, height = map(int, f.readline().split())
        assert f.readline().strip() == b'255'
        raw = f.read()
    pixels = (ctypes.c_uint8 * len(raw)).from_buffer_copy(raw)
    output = ctypes.POINTER(ctypes.c_uint8)()
    quality = 76.0 if 'CustomerSays-story-02-' in path else 82.0
    size = lib.WebPEncodeRGB(pixels, width, height, width * 3, quality, ctypes.byref(output))
    if not size:
        raise RuntimeError(f'WebP encoding failed for {path}')
    with open(path[:-4] + '.webp', 'wb') as f:
        f.write(ctypes.string_at(output, size))
    lib.WebPFree(output)
    os.remove(path)
    os.remove(path[:-4] + '.png')
