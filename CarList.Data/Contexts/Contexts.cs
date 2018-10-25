
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Newtonsoft.Json;

namespace CarList.Data.Contexts
{
    public class DataStoreObject
    {
        public string Id { get; set; }
        public bool isDeleted { get; set; }

    }

    public interface IContext<T> where T : DataStoreObject
    {
        void Save(T data);
        T GetById(string id);
        List<T> GetAll();
        void Delete(string id);

    }

    public class JsonContext<T> : IContext<T> where T : DataStoreObject
    {
        private readonly string _filePath;
        
        public JsonContext(string filePath)
        {
            _filePath = filePath;
            if (!File.Exists(_filePath))
            {
                var stream = File.Create(_filePath);
                stream.Close();
            }
        }

        private List<T> Read()
        {
            var list = JsonConvert.DeserializeObject<List<T>>(File.ReadAllText(_filePath));
            list = list ?? new List<T>();
            return list;
        }

        private void Write(List<T> models)
        {
            File.WriteAllText(_filePath, JsonConvert.SerializeObject(models));
        }

        public void Save(T data)
        {
            if (string.IsNullOrEmpty(data.Id))
            {
                data.Id = new Guid().ToString();
            }

            data.isDeleted = false;
            WriteChangesToItem(data.Id, data);
        }

        public T GetById(string id)
        {
            var data = Read().FirstOrDefault(x => x.Id == id && !x.isDeleted);
            return data;
        }

        public List<T> GetAll()
        {
            var data = Read();
            return data;
        }

        public void Delete(string id)
        {
           var data = Read();
           var result = data.FirstOrDefault(x => x.Id == id && !x.isDeleted);
            if (result != null)
            {
                result.isDeleted = true;
                WriteChangesToItem(id, result);
            }
        }

        private void WriteChangesToItem(string id, T data )
        {
            var entireFile = Read();
            var oldData = entireFile.FirstOrDefault(x => id == x.Id);
            if (oldData != null)
            {
                var index = entireFile.IndexOf(oldData);
                entireFile[index] = data;
            }
            else
            {
                entireFile.Add(data);
            }
            Write(entireFile);
        }
    }

}