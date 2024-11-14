import matplotlib.pyplot as plt
import numpy as np

# Dados simulados para área afetada por incêndios ao longo do tempo (em hectares)
meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
area_afetada_antes = [150, 130, 170, 160, 180, 140, 155, 180, 175, 150, 130, 125]
area_afetada_depois = [110, 100, 90, 80, 75, 70, 65, 60, 55, 50, 45, 40]

# Configurando o gráfico
fig, ax = plt.subplots(figsize=(12, 6))

# Plotagem das barras
bar_width = 0.35
index = np.arange(len(meses))

# Barras de antes e depois
bars1 = ax.bar(index, area_afetada_antes, bar_width, label='Antes do GuardFire', color='red', alpha=0.7)
bars2 = ax.bar(index + bar_width, area_afetada_depois, bar_width, label='Depois do GuardFire', color='green', alpha=0.7)

# Configuração dos eixos e título
ax.set_xlabel('Meses')
ax.set_ylabel('Área Afetada (ha)')
ax.set_title('Redução de Danos Ambientais - GuardFire')
ax.set_xticks(index + bar_width / 2)
ax.set_xticklabels(meses)

# Legenda
ax.legend()

# Exibição do gráfico
plt.tight_layout()
plt.show()
