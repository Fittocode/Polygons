# Polygons

p5.js Game

Alien CFOs (Circular Falling Objects) are being reported raining from the sky. You live in a polygonal world, which means you distrust and fear anything with curvature (rightfully so). 

Your task is to trap all CFOs (for future interrogation) by enclosing them in polygons as they fall, which also happens to earn you points. A triangle is worth 3 points for every CFO trapped, a square or rectangle 4 points, and so on. Polygons can be any size. The larger the size, the more CFOs you will likely trap. 

However, once you draw a complete polygon, that polygon is locked into place. All future CFOs that fall will bounce off these established polygons.

As a bonus, if your Polygon is equilateral (meaning all sides are of equal length), the polygon will instead absorb every CFO that hits it, and every CFO absorbed will be worth double points (6 for triangles, 8 for squares, etc).

You lose if you draw a polygon that intersects with a pre-existing polygon or if a CFO makes it to earth. 

CFOs will fall faster and in greater number as time goes on. 