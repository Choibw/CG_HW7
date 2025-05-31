#version 330 core

in vec3 FragPos;
in vec3 Normal;
in vec3 Color;

out vec4 FragColor;

// Uniforms
uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 ka;
uniform vec3 kd;  
uniform vec3 ks;
uniform float shininess;
uniform float Ia;

void main()
{
    // Normal 계산
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 halfwayDir = normalize(lightDir + viewDir);

    // 조명 성분 계산
    vec3 ambient = Ia * ka;

    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * kd;

    float spec = pow(max(dot(norm, halfwayDir), 0.0), shininess);
    vec3 specular = spec * ks;

    vec3 result = (ambient + diffuse + specular) * lightColor;

    // 감마 보정 (γ = 2.2)
    result = pow(result, vec3(1.0 / 2.2));

    FragColor = vec4(result, 1.0);
}
