#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec3 aColor;

out vec3 FragPos;    // View Space 위치
out vec3 Normal;     // View Space 법선
out vec3 Color;      // 색상

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    mat4 modelView = view * model;

    vec4 viewPos = modelView * vec4(aPos, 1.0);
    FragPos = viewPos.xyz;

    mat3 normalMatrix = mat3(transpose(inverse(view * model)));
    Normal = normalize(normalMatrix * aNormal);  // view space에서의 법선    

    Color = aColor;

    gl_Position = projection * viewPos;
}
