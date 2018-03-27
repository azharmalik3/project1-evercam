@ECHO OFF
:: Lighten darker areas of all images in a directory
%~d1
CD "%~p1"
mkdir images
mkdir images\pictures
FOR %%a in (*.png) DO (
  ECHO Processing file: "%%~nxa"
  convert %%a -crop 1x1-6-6@ +repage %cd%\images\pictures\%%a
  convert %cd%\images\pictures\%%a -fuzz 2%% -transparent black %cd%\images\pictures\%%a
)
ffmpeg -i %cd%\images\pictures\%%d.png -c:v libx264 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=15,format=yuv420p" %cd%\images\video.mp4
ffmpeg -i %cd%\images\video.mp4 -pix_fmt rgb24 -loop 1 %cd%\images\out.gif
pause