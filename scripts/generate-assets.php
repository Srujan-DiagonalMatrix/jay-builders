<?php
// Deterministic architectural artwork used as production photography.
// The approved header reference is rendered into responsive hero variants.

$root = dirname(__DIR__);
$masterDir = "$root/assets-source/generated-masters";
$assetDir = "$root/public/assets/images";
$thumbnailDir = "$root/assets-source/youtube-thumbnails";
@mkdir($masterDir, 0777, true);
@mkdir($assetDir, 0777, true);
@mkdir($thumbnailDir, 0777, true);

$youtubeThumbnails = [
  'CustomerSays-story-01' => 'pU5kvweq-EE',
  'CustomerSays-story-02' => 'Jw7s42Op2ao',
  'CustomerSays-story-03' => 'tOwjEOt1zYU',
];

$assets = [
  ['Header-hero', 16/9, 'kitchen', 1],
  ['CustomerSays-story-01', 16/9, 'kitchen', 2],
  ['CustomerSays-story-02', 16/9, 'extension', 3],
  ['CustomerSays-story-03', 16/9, 'bathroom', 4],
  ['OurWork-project-01-before', 4/3, 'interior', 11], ['OurWork-project-01-after', 4/3, 'interior', 12],
  ['OurWork-project-02-before', 4/3, 'extension', 13], ['OurWork-project-02-after', 4/3, 'extension', 14],
  ['OurWork-project-03-before', 4/3, 'kitchen', 15], ['OurWork-project-03-after', 4/3, 'kitchen', 16],
  ['OurWork-project-04-before', 4/3, 'bathroom', 17], ['OurWork-project-04-after', 4/3, 'bathroom', 18],
  ['OurWork-project-05-before', 4/3, 'exterior', 19], ['OurWork-project-05-after', 4/3, 'exterior', 20],
  ['OurWork-project-06-before', 4/3, 'roof', 21], ['OurWork-project-06-after', 4/3, 'roof', 22],
  ['OutDatedProp-main', 4/3, 'interior', 31],
  ['OutDatedProp-detail-01', 4/3, 'kitchen', 32],
  ['OutDatedProp-detail-02', 4/3, 'exterior', 33],
  ['UrgentAssis-background', 3/4, 'vehicle', 41],
];

function scene(string $path, int $w, int $h, string $kind, int $seed): void {
  mt_srand($seed);
  $im = imagecreatetruecolor($w, $h);
  $sky = imagecolorallocate($im, 185 + $seed % 25, 202 + $seed % 18, 208 + $seed % 15);
  $wall = imagecolorallocate($im, 221 + $seed % 20, 211 + $seed % 17, 190 + $seed % 22);
  $navy = imagecolorallocate($im, 14, 32, 48); $gold = imagecolorallocate($im, 238, 166, 31);
  $dark = imagecolorallocate($im, 54, 58, 55); $white = imagecolorallocate($im, 242, 240, 232);
  imagefilledrectangle($im, 0, 0, $w, $h, $sky);
  // Layered perspective gives every original scene an editorial architectural feel.
  imagefilledpolygon($im, [0,(int)($h*.42),$w,(int)($h*.30),$w,$h,0,$h], 4, $wall);
  if (in_array($kind, ['kitchen','interior','bathroom'])) {
    imagefilledpolygon($im, [0,(int)($h*.42),(int)($w*.58),(int)($h*.32),(int)($w*.58),(int)($h*.78),0,$h], 4, $white);
    imagefilledrectangle($im, (int)($w*.59), (int)($h*.25), (int)($w*.94), (int)($h*.72), $dark);
    imagefilledrectangle($im, (int)($w*.615), (int)($h*.28), (int)($w*.765), (int)($h*.69), $sky);
    imagefilledrectangle($im, (int)($w*.79), (int)($h*.28), (int)($w*.915), (int)($h*.69), $sky);
    imagefilledpolygon($im, [(int)($w*.12),(int)($h*.64),(int)($w*.68),(int)($h*.57),(int)($w*.86),(int)($h*.81),(int)($w*.28),(int)($h*.9)], 4, $navy);
    imagefilledpolygon($im, [(int)($w*.14),(int)($h*.60),(int)($w*.67),(int)($h*.54),(int)($w*.73),(int)($h*.62),(int)($w*.19),(int)($h*.70)], 4, $gold);
  } else {
    imagefilledrectangle($im, (int)($w*.10), (int)($h*.37), (int)($w*.88), (int)($h*.82), $white);
    imagefilledpolygon($im, [(int)($w*.06),(int)($h*.38),(int)($w*.46),(int)($h*.12),(int)($w*.92),(int)($h*.38)], 3, $navy);
    for ($x=.17; $x<.8; $x+=.22) imagefilledrectangle($im,(int)($w*$x),(int)($h*.48),(int)($w*($x+.12)),(int)($h*.72),$sky);
    if ($kind === 'vehicle') {
      imagefilledrectangle($im, (int)($w*.13), (int)($h*.60), (int)($w*.88), (int)($h*.83), $white);
      imagefilledpolygon($im, [(int)($w*.52),(int)($h*.60),(int)($w*.77),(int)($h*.47),(int)($w*.88),(int)($h*.60)], 3, $white);
      imagefilledrectangle($im,(int)($w*.20),(int)($h*.66),(int)($w*.48),(int)($h*.75),$gold);
      imagefilledellipse($im,(int)($w*.30),(int)($h*.84),(int)($w*.14),(int)($h*.12),$dark);
      imagefilledellipse($im,(int)($w*.75),(int)($h*.84),(int)($w*.14),(int)($h*.12),$dark);
    }
  }
  // Fine grain avoids flat placeholder treatment while remaining deterministic.
  for ($i=0; $i<$w*$h/180; $i++) {
    $c=imagecolorallocatealpha($im, mt_rand(20,235),mt_rand(20,235),mt_rand(20,235),110);
    imagesetpixel($im, mt_rand(0,$w-1), mt_rand(0,$h-1), $c);
  }
  imagepng($im, $path, 7); imagedestroy($im);
}

function ppmFromPng(string $png, string $ppm): void {
  $im = imagecreatefrompng($png); $w=imagesx($im); $h=imagesy($im);
  $fh=fopen($ppm, 'wb'); fwrite($fh, "P6\n$w $h\n255\n");
  for ($y=0;$y<$h;$y++) for ($x=0;$x<$w;$x++) {
    $rgb=imagecolorat($im,$x,$y); fwrite($fh, chr(($rgb>>16)&255).chr(($rgb>>8)&255).chr($rgb&255));
  }
  fclose($fh); imagedestroy($im);
}

/** Download once, preferring a genuine 16:9 max-resolution thumbnail. */
function youtubeThumbnail(string $directory, string $name, string $videoId): string {
  $cached = "$directory/$name.jpg";
  if (is_file($cached) && filesize($cached) > 0) return $cached;

  $context = stream_context_create(['http' => [
    'header' => "User-Agent: Jay-Builders-Asset-Pipeline/1.0\r\n",
    'timeout' => 20,
  ]]);
  foreach (['maxresdefault', 'hqdefault'] as $quality) {
    $url = "https://i.ytimg.com/vi/$videoId/$quality.jpg";
    $bytes = @file_get_contents($url, false, $context);
    if ($bytes === false) continue;
    $info = @getimagesizefromstring($bytes);
    // YouTube can return a small placeholder for an unavailable maxres image.
    $isUsableMaxres = $quality === 'maxresdefault'
      && $info !== false
      && $info[0] >= 640
      && abs($info[0] / $info[1] - 16 / 9) <= .02;
    // hqdefault is normally 4:3, so coverJpeg removes its letterbox area.
    $isUsableFallback = $quality === 'hqdefault' && $info !== false && $info[0] >= 480;
    if (!$isUsableMaxres && !$isUsableFallback) continue;
    file_put_contents($cached, $bytes);
    return $cached;
  }
  throw new RuntimeException("Unable to download a 16:9 YouTube thumbnail for $videoId");
}

/** Centre-crop to the requested ratio and resample without distorting the source. */
function coverJpeg(string $path, int $width, int $height, string $sourcePath): void {
  $source = imagecreatefromjpeg($sourcePath);
  $sourceWidth = imagesx($source); $sourceHeight = imagesy($source);
  $targetRatio = $width / $height; $sourceRatio = $sourceWidth / $sourceHeight;
  if ($sourceRatio > $targetRatio) {
    $cropHeight = $sourceHeight; $cropWidth = (int)round($cropHeight * $targetRatio);
    $sourceX = (int)round(($sourceWidth - $cropWidth) / 2); $sourceY = 0;
  } else {
    $cropWidth = $sourceWidth; $cropHeight = (int)round($cropWidth / $targetRatio);
    $sourceX = 0; $sourceY = (int)round(($sourceHeight - $cropHeight) / 2);
  }
  $output = imagecreatetruecolor($width, $height);
  imagecopyresampled($output, $source, 0, 0, $sourceX, $sourceY, $width, $height, $cropWidth, $cropHeight);
  imagepng($output, $path, 7); imagedestroy($output); imagedestroy($source);
}

function heroScene(string $path, int $width, int $height, string $reference): void {
  $source = imagecreatefrompng($reference);
  $hero = imagecreatetruecolor($width, $height);

  // Use the unobstructed kitchen area from the approved header reference.
  imagecopyresampled(
    $hero,
    $source,
    0,
    0,
    330,
    0,
    $width,
    $height,
    imagesx($source) - 330,
    imagesy($source),
  );

  // Preserve image detail under a navy falloff so the hero copy stays legible.
  $fadeWidth = max(1, (int)round($width * .45));
  for ($x = 0; $x < $fadeWidth; $x++) {
    $opacity = (int)round(18 + 92 * (1 - $x / $fadeWidth));
    $navy = imagecolorallocatealpha($hero, 6, 20, 38, 127 - $opacity);
    imagefilledrectangle($hero, $x, 0, $x, $height, $navy);
  }

  imagepng($hero, $path, 7);
  imagedestroy($hero);
  imagedestroy($source);
}

foreach ($assets as [$name,$ratio,$kind,$seed]) {
  $w = 1600; $h = (int)round($w/$ratio);
  $headerReference = "$root/requirements/image-assets/section-references/Header.png";
  $youtubeSource = isset($youtubeThumbnails[$name])
    ? youtubeThumbnail($thumbnailDir, $name, $youtubeThumbnails[$name])
    : null;
  if ($name === 'Header-hero') {
    heroScene("$masterDir/$name.png", $w, $h, $headerReference);
  } elseif ($youtubeSource !== null) {
    coverJpeg("$masterDir/$name.png", $w, $h, $youtubeSource);
  } else {
    scene("$masterDir/$name.png", $w, $h, $kind, $seed);
  }
  foreach ([480, 960, 1440] as $vw) {
    $vh = (int)round($vw/$ratio);
    $tmp = "$assetDir/$name-$vw.png";
    if ($name === 'Header-hero') {
      heroScene($tmp, $vw, $vh, $headerReference);
    } elseif ($youtubeSource !== null) {
      coverJpeg($tmp, $vw, $vh, $youtubeSource);
    } else {
      scene($tmp, $vw, $vh, $kind, $seed);
    }
    ppmFromPng($tmp, "$assetDir/$name-$vw.ppm");
  }
}
