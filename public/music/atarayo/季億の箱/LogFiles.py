import os

dir_path = os.path.dirname(os.path.realpath(__file__))

music_list = []

for filename in os.listdir(dir_path):
    if (filename.endswith(".mp3")):
        files = filename.split('.')
        id_str = "{id: " + str(int(files[0])) + ", name: '" + files[1] + "', author: 'あたらよ', album: '季億の箱', keywords: ['atarayo', '可惜夜', 'bokurahasorewoaitoanda.'], type: 'music', cover: './music/atarayo/季億の箱/COVER.jpg', file: './music/atarayo/季億の箱/" + filename + "', year: 2023, description: ''}"
        music_list.append(id_str)

print(','.join(music_list))
